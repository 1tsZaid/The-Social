import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemedView } from '@/components/ThemedView';
import { HomeHeader } from '@/components/HomeHeader';

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
      <HomeHeader
        users={sampleUsers}
        onMenuPress={handleMenuPress}
        onAvatarPress={handleAvatarPress}
        height={56}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 