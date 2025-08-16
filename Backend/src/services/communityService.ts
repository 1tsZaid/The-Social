import prisma from '../config/database';

interface Location {
  coordinates: [number, number]; // [longitude, latitude]
  name: string;
}

interface CreateCommunityPayload {
  name: string;
  description: string;
  location: Location;
  communityImageInBase64?: string; // base64 encoded string of the community image
  banner: string;
}

interface Community extends Omit<CreateCommunityPayload, 'communityImageInBase64'> {
  communityId: string; // unique identifier for the community set by the backend
  communityImageUrl?: string; // URL to the community image
  members: number;
  nearby: boolean;
}

export interface FindCommunitiesParams {
  latitude: number;
  longitude: number;
  limit?: number;
  page?: number;
}

class CommunityService {
  private readonly DEFAULT_LIMIT = 10;
  private readonly MAX_LIMIT = 100;
  private readonly NEARBY_DISTANCE_M = 5000; // 5 kilometers in meters for PostGIS

  async createCommunity(userId: string, payload: CreateCommunityPayload): Promise<Community> {
    try {
      // Create community with PostGIS point geometry
      const createdCommunity = await prisma.$queryRaw<any[]>`
        INSERT INTO "Community" (
          "communityId", 
          "name", 
          "description", 
          "locationName", 
          "location", 
          "banner", 
          "ownerId"
        ) VALUES (
          ${prisma.community.create.name}(), -- Generate cuid
          ${payload.name},
          ${payload.description},
          ${payload.location.name},
          ST_SetSRID(ST_MakePoint(${payload.location.coordinates[0]}, ${payload.location.coordinates[1]}), 4326),
          ${payload.banner},
          ${userId}
        )
        RETURNING "communityId", "name", "description", "locationName", "banner", 
                 ST_X("location") as lng, ST_Y("location") as lat
      `;

      const community = createdCommunity[0];

      // Connect the creator as a member
      await prisma.community.update({
        where: { communityId: community.communityId },
        data: {
          members: {
            connect: { id: userId }
          }
        }
      });

      // Return the created community
      return {
        communityId: community.communityId,
        name: community.name,
        description: community.description,
        location: {
          coordinates: [community.lng, community.lat],
          name: community.locationName
        },
        banner: community.banner,
        members: 1,
        nearby: false
      };
    } catch (error) {
      console.error('Error creating community:', error);
      throw new Error('Failed to create community');
    }
  }

  async getCommunitiesNearby(userId: string, params: FindCommunitiesParams): Promise<Community[]> {
    try {
      const limit = Math.min(params.limit ?? this.DEFAULT_LIMIT, this.MAX_LIMIT);
      const skip = params.page ? (params.page - 1) * limit : 0;

      // Query for nearby communities that the user has NOT joined using PostGIS
      const communities = await prisma.$queryRaw<any[]>`
        SELECT 
          c."communityId",
          c."name",
          c."description",
          c."locationName",
          c."banner",
          ST_X(c."location") as lng,
          ST_Y(c."location") as lat,
          COUNT(m."A") as member_count,
          ST_Distance(
            c."location"::geography,
            ST_SetSRID(ST_MakePoint(${params.longitude}, ${params.latitude}), 4326)::geography
          ) as distance_meters
        FROM "Community" c
        LEFT JOIN "_UserCommunities" m ON c."communityId" = m."B"
        LEFT JOIN "_UserCommunities" user_membership ON c."communityId" = user_membership."B" AND user_membership."A" = ${userId}
        WHERE user_membership."A" IS NULL
          AND ST_DWithin(
            c."location"::geography,
            ST_SetSRID(ST_MakePoint(${params.longitude}, ${params.latitude}), 4326)::geography,
            ${this.NEARBY_DISTANCE_M}
          )
        GROUP BY c."communityId", c."name", c."description", c."locationName", c."banner", c."location"
        ORDER BY distance_meters ASC
        LIMIT ${limit}
        OFFSET ${skip}
      `;

      return communities.map(community => ({
        communityId: community.communityId as string,
        name: community.name,
        description: community.description,
        location: {
          coordinates: [community.lng, community.lat],
          name: community.locationName
        },
        banner: community.banner,
        members: parseInt(community.member_count) || 0,
        nearby: true // All results are nearby by definition
      }));
    } catch (error) {
      console.error('Error fetching nearby communities:', error);
      throw new Error('Failed to fetch nearby communities');
    }
  }

  async getCommunity(communityId: string): Promise<Community | null> {
    try {
      const community = await prisma.$queryRaw<any[]>`
        SELECT 
          c."communityId",
          c."name",
          c."description",
          c."locationName",
          c."banner",
          ST_X(c."location") as lng,
          ST_Y(c."location") as lat,
          COUNT(m."A") as member_count
        FROM "Community" c
        LEFT JOIN "_UserCommunities" m ON c."communityId" = m."B"
        WHERE c."communityId" = ${communityId}
        GROUP BY c."communityId", c."name", c."description", c."locationName", c."banner", c."location"
      `;

      if (!community || community.length === 0) {
        return null;
      }

      const communityData = community[0];
      return {
        communityId: communityData.communityId,
        name: communityData.name,
        description: communityData.description,
        location: {
          coordinates: [communityData.lng, communityData.lat],
          name: communityData.locationName
        },
        banner: communityData.banner,
        members: parseInt(communityData.member_count) || 0,
        nearby: false
      };
    } catch (error) {
      console.error('Error fetching community:', error);
      throw new Error('Failed to fetch community');
    }
  }

  async joinCommunity(userId: string, communityId: string): Promise<boolean> {
    try {
      await prisma.community.update({
        where: { communityId: communityId },
        data: {
          members: {
            connect: { id: userId }
          }
        }
      });
      return true;
    } catch (error) {
      console.error('Error joining community:', error);
      throw new Error('Failed to join community');
    }
  }

  async leaveCommunity(userId: string, communityId: string): Promise<boolean> {
    try {
      await prisma.community.update({
        where: { communityId: communityId },
        data: {
          members: {
            disconnect: { id: userId }
          }
        }
      });
      return true;
    } catch (error) {
      console.error('Error leaving community:', error);
      throw new Error('Failed to leave community');
    }
  }

  async getUserCommunities(userId: string, params?: FindCommunitiesParams): Promise<Community[]> {
    try {
      const limit = Math.min(params?.limit ?? this.DEFAULT_LIMIT, this.MAX_LIMIT);
      const skip = params?.page ? (params.page - 1) * limit : 0;

      let query = `
        SELECT 
          c."communityId",
          c."name",
          c."description",
          c."locationName",
          c."banner",
          ST_X(c."location") as lng,
          ST_Y(c."location") as lat,
          COUNT(m."A") as member_count
      `;

      // Add distance calculation if coordinates are provided
      if (params?.latitude && params?.longitude) {
        query += `,
          ST_Distance(
            c."location"::geography,
            ST_SetSRID(ST_MakePoint(${params.longitude}, ${params.latitude}), 4326)::geography
          ) as distance_meters
        `;
      }

      query += `
        FROM "Community" c
        LEFT JOIN "_UserCommunities" m ON c."communityId" = m."B"
        INNER JOIN "_UserCommunities" user_membership ON c."communityId" = user_membership."B"
        WHERE user_membership."A" = ${userId}
        GROUP BY c."communityId", c."name", c."description", c."locationName", c."banner", c."location"
        ORDER BY c."name" ASC
        LIMIT ${limit}
        OFFSET ${skip}
      `;

      const communities = await prisma.$queryRaw<any[]>`${query}`;

      return communities.map(community => {
        let nearby = false;
        if (params?.latitude && params?.longitude && community.distance_meters) {
          nearby = community.distance_meters <= this.NEARBY_DISTANCE_M;
        }

        return {
          communityId: community.communityId,
          name: community.name,
          description: community.description,
          location: {
            coordinates: [community.lng, community.lat],
            name: community.locationName
          },
          banner: community.banner,
          members: parseInt(community.member_count) || 0,
          nearby
        };
      });
    } catch (error) {
      console.error('Error fetching user communities:', error);
      throw new Error('Failed to fetch user communities');
    }
  }
}

export const communityService = new CommunityService();