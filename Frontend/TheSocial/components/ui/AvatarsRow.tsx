import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar } from './Avatar';

interface Data {
  id: string;
  imageUrl?: string;
  isActive: boolean;
}

interface AvatarsRowProps {
  data: Data[];
  avatarSize?: number;
  maxVisible?: number;
  onAvatarPress: (communityId: string) => void;
}

export function AvatarsRow({ 
  data, 
  avatarSize = 40, 
  maxVisible = 7,
  onAvatarPress 
}: AvatarsRowProps) {
  const visibleUsers = data.slice(0, maxVisible);

  return (
    <View style={styles.container}>
      {visibleUsers.map((user, index) => (
        <View key={user.id} style={[styles.avatarContainer, { marginLeft: index > 0 ? 8 : 0 }]}>
          <Avatar
            size={avatarSize}
            id={user.id}
            imageUrl={user.imageUrl}
            isActive={user.isActive}
            onPress={onAvatarPress}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 