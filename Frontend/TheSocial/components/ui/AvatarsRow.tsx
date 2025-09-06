import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar } from './Avatar';

import { useThemeColor } from '@/hooks/useThemeColor';

interface Data {
  id: string;
  imageUrl?: string;
  banner: string;
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
  const textPrimaryColor = useThemeColor({}, 'textPrimary');
  
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
    activeLine: {
      position: 'absolute',
      bottom: -6,
      marginTop: 4,
      width: '75%',
      height: 3,
      backgroundColor: textPrimaryColor,
      borderRadius: 50,
    },
  }); 

  return (
    <View style={styles.container}>
      {visibleUsers.map((user, index) => (
        <View key={user.id} style={[styles.avatarContainer, { marginLeft: index > 0 ? 8 : 0 }]}>
          <Avatar
            size={avatarSize}
            id={user.id}
            imageUrl={user.imageUrl}
            banner={user.banner}
            isActive={user.isActive}
            onPress={onAvatarPress}
          />
          {user.isActive && <View style={styles.activeLine} />}
        </View>
      ))}
    </View>
  );
}
