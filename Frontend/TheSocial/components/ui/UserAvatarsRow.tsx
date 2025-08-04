import React from 'react';
import { View, StyleSheet } from 'react-native';
import { UserAvatar } from './UserAvatar';

interface User {
  id: string;
  imageUrl?: string;
  isActive?: boolean;
}

interface UserAvatarsRowProps {
  users: User[];
  avatarSize?: number;
  maxVisible?: number;
  onAvatarPress?: (userId: string) => void;
}

export function UserAvatarsRow({ 
  users, 
  avatarSize = 40, 
  maxVisible = 7,
  onAvatarPress 
}: UserAvatarsRowProps) {
  const visibleUsers = users.slice(0, maxVisible);

  return (
    <View style={styles.container}>
      {visibleUsers.map((user, index) => (
        <View key={user.id} style={[styles.avatarContainer, { marginLeft: index > 0 ? 8 : 0 }]}>
          <UserAvatar
            size={avatarSize}
            imageUrl={user.imageUrl}
            isActive={user.isActive}
            onPress={onAvatarPress ? () => onAvatarPress(user.id) : undefined}
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