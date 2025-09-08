import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator, Text, StyleSheet, Button } from 'react-native';

import MainButton from '@/components/MainButton';
import { CommunityMemberRow } from '@/components/CommunityMemberRow';
import { useCommunities } from '@/components/CommunitiesContext';
import { useModal } from '@/components/ModalContext';



import type { CommunityMember } from '@/services/community';
import { getCommunityMembers, changeCommunityOwner, leaveCommunity, kickFromCommunity } from '@/services/community';
import { getProfile } from '@/services/profile';
import { checkTokens } from '@/utils/checkTokens';
import { ThemedText } from '@/components/ThemedText';


interface CommunityMemberProps {
  toSettings: () => void;
}

export default function CommunityMembers({ toSettings }: CommunityMemberProps) {
  const { selectedCommunityId, communities } = useCommunities();
  const [members, setMembers] = useState<CommunityMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const community = communities.find(c => c.communityId === selectedCommunityId);
  
  const { closeModal } = useModal();

  useEffect(() => {
    const fetchMembers = async () => {
      if (!selectedCommunityId) return;
      setLoading(true);
      setError(null);
      try {
        await checkTokens();
        const [profile, data] = await Promise.all([
          getProfile(),
          getCommunityMembers(selectedCommunityId),
        ]);
        // Filter out the current user from the members list
        const filtered = data.filter((member: CommunityMember) => member.username !== profile.username);
        console.log('Community members fetched:', filtered);
        setMembers(filtered);
      } catch (e) {
        setError('Failed to load members');
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, [selectedCommunityId]);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>{error}</Text>;
  if (!community) return <Text>No community selected.</Text>;

  return (
    <View style={styles.container}>
      <View style={{ padding: 20 }}>
        <MainButton title="Back to Settings" onPress={toSettings} />
      </View>
      <ScrollView>
        {members.length === 0 ? (   
          <ThemedText style={styles.emptyText}>No members found.</ThemedText>
        ) : (
          members.map(member => {
            const handlePromote = async () => {
              if (!selectedCommunityId) return;
              try {
                await changeCommunityOwner(selectedCommunityId, member.id);
                closeModal();
              } catch (e) {
                console.log('Failed to promote member', e);
              }
            };
            const handleKick = async () => {
              if (!selectedCommunityId) return;
              try {
                await kickFromCommunity(selectedCommunityId, member.id);
                // Optionally refresh members list or show feedback
              } catch (e) {
                console.log('Failed to kick member', e);
              }
            };
            return (
              <CommunityMemberRow
                key={member.id}
                name={member.username}
                imageUrl={member.profileImageUrl}
                banner={member.banner}
                onPromote={handlePromote}
                onKick={handleKick}
              />
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
  },
});