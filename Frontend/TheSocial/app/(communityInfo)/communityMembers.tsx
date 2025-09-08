import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator, Text, StyleSheet, Button } from 'react-native';

import MainButton from '@/components/MainButton';
import { CommunityMemberRow } from '@/components/CommunityMemberRow';
import { useCommunities } from '@/components/CommunitiesContext';

import { getCommunityMembers, CommunityMember } from '@/services/community';


interface CommunityMemberProps {
  toSettings: () => void;
}

export default function CommunityMembers({ toSettings }: CommunityMemberProps) {
  const { selectedCommunityId, communities } = useCommunities();
  const [members, setMembers] = useState<CommunityMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const community = communities.find(c => c.communityId === selectedCommunityId);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!selectedCommunityId) return;
      setLoading(true);
      setError(null);
      try {
        const data = await getCommunityMembers(selectedCommunityId);
        setMembers(data);
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
          <Text style={styles.emptyText}>No members found.</Text>
        ) : (
          members.map(member => (
            <CommunityMemberRow
              key={member.id}
              name={member.username}
              imageUrl={member.profileImageUrl}
              banner={member.banner}
              onPromote={() => console.log('Promote pressed', member.id)}
              onKick={() => console.log('Kick pressed', member.id)}
            />
          ))
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
    color: '#888',
  },
});