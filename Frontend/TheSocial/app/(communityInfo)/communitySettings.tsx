import React from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommunityHeader } from '@/components/CommunityHeader';
import { SettingItem } from '@/components/SettingItem';
import { DeleteButton } from '@/components/DeleteButton';
import { CommunityAdditionalInfo } from '@/components/CommunityAdditionalInfo';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useCommunities } from '@/components/CommunitiesContext';

import { checkTokens } from '@/utils/checkTokens';
import { leaveCommunity } from '@/services/community';

interface CommunitySettingsProps {
  toMembers: () => void;
  toEdit: () => void;
}

export default function CommunitySettingScreen({ toMembers, toEdit }: CommunitySettingsProps) {
  const { communities, selectedCommunityId, loading, refreshCommunities, setSelectedCommunity } = useCommunities();
  const divderColor = useThemeColor({}, 'borderDivider');
  const backgroundColor = useThemeColor({}, 'background');
  const blueColor = useThemeColor({}, 'blue');

  const community = communities.find(c => c.communityId === selectedCommunityId);

  if (loading || !community) {
    return <ActivityIndicator />;
  }

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor,
    },
    scrollView: {
      flex: 1,
    },
    container: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },
    bodyContainer: {
      marginTop: 10,
      paddingHorizontal: 24,
      gap: 5,
    },
    divider: {
      height: 1,
      backgroundColor: divderColor,
      marginHorizontal: 25,
      marginTop: 20,
    },
    bottomSpacing: {
      height: 40,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {/* Community Header */}
          <CommunityHeader
            communityName={community.name}
            communityImage={community.communityImageUrl}
            bannerColor={community.banner}
            onEdit={toEdit}
          />

          {/* <View style={styles.divider} /> */}

          <View style={styles.bodyContainer}>
            <CommunityAdditionalInfo
              description={community.description || 'No description provided.'}
              location={community.location.name || 'Earth'}
            />
            <SettingItem
              icon="accessibility"
              color={blueColor}
              title="Members"
              chevron={true}
              onPress={toMembers}
            />
            
            {/* Logout Button */}
            <DeleteButton onDelete={async () => {await checkTokens(); await leaveCommunity(community.communityId); await refreshCommunities(); setSelectedCommunity(null);}} />
          </View>

          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}