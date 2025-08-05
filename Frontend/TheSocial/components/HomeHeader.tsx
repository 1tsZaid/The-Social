import React from 'react';
import { View, StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { HamburgerIcon } from '@/components/ui/HamburgerIcon';
import { UserAvatarsRow } from '@/components/ui/UserAvatarsRow';
import { useThemeColor } from '@/hooks/useThemeColor';

interface User {
  id: string;
  imageUrl?: string;
  isActive?: boolean;
}

interface HomeHeaderProps {
  users?: User[];
  onMenuPress?: () => void;
  onAvatarPress?: (userId: string) => void;
  height?: number;
}

export function HomeHeader({ 
  users = [], 
  onMenuPress, 
  onAvatarPress,
  height = 55 
}: HomeHeaderProps) {
  const borderColor = useThemeColor({}, 'borderDivider');

  return (
    <ThemedView style={[styles.container, { height, borderBottomColor: borderColor }]} backgroundType='background'>
      
      {/* Header content */}
      <View style={styles.content}>
        {/* Hamburger menu */}
        <View style={styles.menuContainer}>
          <HamburgerIcon onPress={onMenuPress} size={22} />
        </View>
        
        {/* User avatars row */}
        <View style={styles.avatarsContainer}>
          <UserAvatarsRow
            users={users}
            avatarSize={40}
            maxVisible={7}
            onAvatarPress={onAvatarPress}
          />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  menuContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
}); 