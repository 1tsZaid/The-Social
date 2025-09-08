import prisma from '../config/database';
import { createId } from '@paralleldrive/cuid2';
import { communityUploadService, profileUploadService } from '../utils/fileUpload';

export interface CommunityMember {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  profileImageUrl?: string;
  banner: string;
}

interface Location {
  coordinates: [number, number]; // [longitude, latitude]
  name: string;
}

interface UpdateCommunityPayload {
  name?: string;
  description?: string;
  communityImageInBase64?: string; // base64 encoded string of the community image
  banner?: string;
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
  owner: boolean;
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
  private readonly NEARBY_DISTANCE_M = 5000; // 5000 meters = 5 kilometers and in meters for PostGIS
  
  async updateCommunity(communityId: string, payload: UpdateCommunityPayload): Promise<Community> {
    try {
      // Prepare update data
      const updateData: any = {};
      if (payload.name) updateData.name = payload.name;
      if (payload.description) updateData.description = payload.description;
      if (payload.banner) updateData.banner = payload.banner;
      // Update community fields (except image)
      const updated = await prisma.community.update({
        where: { communityId },
        data: updateData,
      });

      // Handle image update if present
      let communityImageUrl = communityUploadService.getFileWithPng(updated.communityId) || undefined;
      if (payload.communityImageInBase64) {
        try {
          // Delete old image if exists
          if (communityImageUrl) {
            await communityUploadService.deleteImage(communityImageUrl);
          }
          console.log("image in base64", payload.communityImageInBase64);
          // Save new image
          communityImageUrl = await communityUploadService.saveBase64Image(communityId, payload.communityImageInBase64);
          console.log("image saved", communityImageUrl);
        } catch (error) {
          throw new Error(`Image upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }

      // Get member count
      const members = await prisma.user.count({
        where: {
          communities: {
            some: { communityId }
          }
        }
      });

      // Get coordinates
      const locationData = await prisma.$queryRaw<any[]>`
        SELECT ST_X(location) as lng, ST_Y(location) as lat, "locationName"
        FROM "Community"
        WHERE "communityId" = ${communityId}
      `;
      const coords = locationData[0] || { lng: 0, lat: 0, locationName: updated.locationName };

      return {
        communityId: updated.communityId,
        name: updated.name,
        description: updated.description,
        location: {
          coordinates: [coords.lng, coords.lat],
          name: coords.locationName
        },
        banner: updated.banner,
        communityImageUrl: communityImageUrl,
        members,
        nearby: true,
        owner: true
      };
    } catch (error) {
      console.error('Error updating community:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to update community');
    }
  }

  async getCommunityMembers(communityId: string): Promise<CommunityMember[]> {
    try {
      const community = await prisma.community.findUnique({
        where: { communityId },
        include: {
          members: {
            select: {
              id: true,
              username: true,
              email: true,
              createdAt: true,
              banner: true
            }
          }
        }
      });
      if (!community) {
        throw new Error('Community not found');
      }
      return community.members.map(member => ({
        id: member.id,
        username: member.username,
        email: member.email,
        createdAt: member.createdAt,
        banner: member.banner,
        profileImageUrl: profileUploadService.getFileWithPng(member.id) || undefined,
      }));
    } catch (error) {
      console.error('Error fetching community members:', error);
      throw new Error('Failed to fetch community members');
    }
  }

  async changeCommunityOwner(currentOwnerId: string, communityId: string, newOwnerId: string): Promise<boolean> {
    try {
      // Check if the community exists and the current owner is correct
      const community = await prisma.community.findUnique({
        where: { communityId },
        select: { ownerId: true, members: { select: { id: true } } }
      });
      if (!community) {
        throw new Error('Community not found');
      }
      if (community.ownerId !== currentOwnerId) {
        throw new Error('You are not authorized to change the owner');
      }
      // Check if newOwnerId is a member of the community
      const isMember = community.members.some(member => member.id === newOwnerId);
      if (!isMember) {
        throw new Error('New owner must be a member of the community');
      }
      // Update the ownerId
      await prisma.community.update({
        where: { communityId },
        data: { ownerId: newOwnerId }
      });
      return true;
    } catch (error) {
      console.error('Error changing community owner:', error);
      throw new Error('Failed to change community owner');
    }
  }

  async createCommunity(userId: string, payload: CreateCommunityPayload): Promise<Community> {
    try {
      // Create community with PostGIS point geometry
      const communityId = createId();
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
          ${communityId},
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

      let communityImageUrl: string = '';
      if (payload.communityImageInBase64) {
        communityImageUrl = await communityUploadService.saveBase64Image(community.communityId, payload.communityImageInBase64);       
      }

      // Return the created community
      return {
        communityId: community.communityId,
        communityImageUrl: communityImageUrl || undefined,
        name: community.name,
        description: community.description,
        location: {
          coordinates: [community.lng, community.lat],
          name: community.locationName
        },
        banner: community.banner,
        members: 1,
        nearby: true,
        owner: true,
      };
    } catch (error) {
      console.error('Error creating community:', error);
      throw new Error('Failed to create community');
    }
  }

  async deleteCommunity(userId: string, communityId: string): Promise<boolean> {
    try {
      // 1. Verify ownership
      const community = await prisma.community.findUnique({
        where: { communityId },
      });

      if (!community) {
        throw new Error('Community not found');
      }

      if (community.ownerId !== userId) {
        throw new Error('You are not authorized to delete this community');
      }

      // 2. Delete related likes -> posts -> memberships -> community
      await prisma.$transaction(async (tx) => {
        // Delete likes for posts in this community
        await tx.like.deleteMany({
          where: {
            post: {
              communityId,
            },
          },
        });

        // Delete posts in this community
        await tx.post.deleteMany({
          where: { communityId },
        });

        // Disconnect members from this community
        await tx.community.update({
          where: { communityId },
          data: {
            members: {
              set: [], // remove all members from relation table
            },
          },
        });

        // Delete the community itself
        await tx.community.delete({
          where: { communityId },
        });
      });

      // 3. Delete stored image if exists
      await communityUploadService.deleteImage(communityId);

      return true;
    } catch (error) {
      console.error('Error deleting community:', error);
      throw new Error('Failed to delete community');
    }
  }


  async getCommunitiesNearby(userId: string, params: FindCommunitiesParams): Promise<Community[]> {
    try {
      const limit = Math.min(params.limit ?? this.DEFAULT_LIMIT, this.MAX_LIMIT);
      const skip = params.page ? (params.page - 1) * limit : 0;

      console.log('limit: ', limit);
      console.log('skip: ', skip);
      console.log('userId: ', userId);
      console.log('latitude: ', params.latitude);
      console.log('longitude: ', params.longitude);


      // Query for nearby communities that the user has NOT joined using PostGIS
      const communities = await prisma.$queryRaw<any[]>`
        SELECT 
          c."communityId",
          c."name",
          c."description",
          c."locationName",
          c."banner",
          c."ownerId",
          ST_X(c."location") as lng,
          ST_Y(c."location") as lat,
          COUNT(m."B") as member_count,
          ST_Distance(
            c."location"::geography,
            ST_SetSRID(ST_MakePoint(${params.longitude}, ${params.latitude}), 4326)::geography
          ) as distance_meters
        FROM "Community" c
        LEFT JOIN "_UserCommunities" m ON c."communityId" = m."A"
        WHERE ST_DWithin(
            c."location"::geography,
            ST_SetSRID(ST_MakePoint(${params.longitude}, ${params.latitude}), 4326)::geography,
            ${this.NEARBY_DISTANCE_M}
          )
          AND c."communityId" NOT IN (
            SELECT uc."A" 
            FROM "_UserCommunities" uc 
            WHERE uc."B" = ${userId}
          )
        GROUP BY c."communityId", c."name", c."description", c."locationName", c."banner", c."location"
        ORDER BY distance_meters ASC
      `;

      console.log('Fetched nearby communities:', communities);

      return communities.map(community => ({
        communityId: community.communityId as string,
        name: community.name,
        description: community.description,
        location: {
          coordinates: [community.lng, community.lat],
          name: community.locationName
        },
        banner: community.banner,
        communityImageUrl: communityUploadService.getFileWithPng(community.communityId) || undefined,
        members: parseInt(community.member_count) || 0,
        nearby: true,
        owner: userId === community.ownerId
      }));
    } catch (error) {
      console.error('Error fetching nearby communities:', error);
      throw new Error('Failed to fetch nearby communities');
    }
  }

  async getCommunity(communityId: string): Promise<(Omit<Community, 'owner'> & { ownerId: string }) | null>  {
    try {
      const community = await prisma.$queryRaw<any[]>`
        SELECT 
          c."communityId",
          c."name",
          c."description",
          c."locationName",
          c."banner",
          c."ownerId",
          ST_X(c."location") as lng,
          ST_Y(c."location") as lat,
          COUNT(m."B") as member_count
        FROM "Community" c
        LEFT JOIN "_UserCommunities" m ON c."communityId" = m."A"
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
        communityImageUrl: communityUploadService.getFileWithPng(communityData.communityId) || undefined,
        members: parseInt(communityData.member_count) || 0,
        nearby: false,
        ownerId: communityData.ownerId
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
      throw error;
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
      console.log('Getting communities for user:', userId);
      
      const limit = Math.min(params?.limit ?? this.DEFAULT_LIMIT, this.MAX_LIMIT);
      const skip = params?.page ? (params.page - 1) * limit : 0;

      // First, get the user with their communities using Prisma relations
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          communities: {
            take: limit,
            skip: skip,
            orderBy: { name: 'asc' },
            select: {
              communityId: true,
              name: true,
              description: true,
              locationName: true,
              banner: true,
              ownerId: true
            }
          }
        }
      });

      console.log('User found:', user ? 'Yes' : 'No');
      console.log('Communities count:', user?.communities?.length || 0);

      if (!user || !user.communities) {
        return [];
      }

      // Convert to the format expected by your interface
      const communities: Community[] = [];
      
      for (const community of user.communities) {
        // Get member count for each community
        const memberCount = await prisma.user.count({
          where: {
            communities: {
              some: {
                communityId: community.communityId
              }
            }
          }
        });

        console.log(`Processing community: ${community.name}, Members: ${memberCount}`);

        // Extract coordinates using raw query for this specific community
        const locationData = await prisma.$queryRaw<any[]>`
          SELECT ST_X(location) as lng, ST_Y(location) as lat
          FROM "Community"
          WHERE "communityId" = ${community.communityId}
        `;

        const coords = locationData[0] || { lng: 0, lat: 0 };

        console.log(`Coordinates for ${community.name}:`, coords);
        console.log(`Coordinates for user:`, params?.longitude, params?.latitude);
        
        let nearby = false;
        let distance;
        if (params?.latitude && params?.longitude) {
          // Calculate distance if coordinates provided
          const distanceResult = await prisma.$queryRaw<any[]>`
            SELECT ST_Distance(
              location::geography,
              ST_SetSRID(ST_MakePoint(${params.longitude}, ${params.latitude}), 4326)::geography
            ) as distance_meters
            FROM "Community"
            WHERE "communityId" = ${community.communityId}
          `;
          
          console.log('distanceResult: ', distanceResult);
          distance = distanceResult[0]?.distance_meters;
          nearby = distance <= this.NEARBY_DISTANCE_M;
        }

        console.log(`Is ${community.name} nearby?`, nearby);
        console.log("distance is: ", distance);

        communities.push({
          communityId: community.communityId,
          name: community.name,
          description: community.description,
          location: {
            coordinates: [coords.lng, coords.lat],
            name: community.locationName
          },
          banner: community.banner,
          communityImageUrl: communityUploadService.getFileWithPng(community.communityId) || undefined,
          members: memberCount,
          nearby,
          owner: userId === community.ownerId
        });
      }

      return communities;
    } catch (error) {
      console.error('Error fetching user communities:', error);
      throw error;
    }
  }
}

export const communityService = new CommunityService();