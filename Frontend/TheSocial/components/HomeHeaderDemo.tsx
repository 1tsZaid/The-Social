import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ThemedView } from '@/components/ThemedView';
import { HamburgerIcon } from '@/components/ui/HamburgerIcon';
import { UserAvatarsRow } from '@/components/ui/UserAvatarsRow';

// Sample user data for demonstration
const sampleUsers = [
  { id: '1', imageUrl: undefined, isActive: true },
  { id: '2', imageUrl: undefined, isActive: false },
  { id: '3', imageUrl: undefined, isActive: false },
  { id: '4', imageUrl: undefined, isActive: false },
  { id: '5', imageUrl: undefined, isActive: false },
  { id: '6', imageUrl: undefined, isActive: false },
  { id: '7', imageUrl: undefined, isActive: false },
];

export function HomeHeaderDemo() {
  const navigation = useNavigation() as any;

  const handleMenuPress = () => {
    navigation.openDrawer();
  };

  const handleAvatarPress = (userId: string) => {
    Alert.alert('Avatar', `User ${userId} avatar pressed`);
  };

  return (
    <ThemedView style={styles.container} backgroundType="background">
      <ThemedView style={{ height: 56 }} >
        {/* Header content */}
        <View style={styles.content}>
          {/* Hamburger menu */}
          <View style={styles.menuContainer}>
            <HamburgerIcon onPress={handleMenuPress} size={22} />
          </View>
          
          {/* User avatars row */}
          <View style={styles.avatarsContainer}>
            <UserAvatarsRow
              users={sampleUsers}
              avatarSize={40}
              maxVisible={7}
              onAvatarPress={handleAvatarPress}
            />
          </View>
        </View>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderBottomLeftRadius : 20,
    borderBottomRightRadius : 20,
    backgroundColor: '#ff0000' + '15',
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