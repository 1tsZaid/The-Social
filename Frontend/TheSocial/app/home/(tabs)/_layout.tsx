import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Animated } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useScroll } from '@/components/ScrollContext';

const tabIcons = {
  messages: { filled: 'chatbubbles' as const, outlined: 'chatbubbles-outline' as const },
  feed: { filled: 'file-tray-full' as const, outlined: 'file-tray-full-outline' as const },
  createCommunity: { filled: 'add-circle' as const, outlined: 'add-circle-outline' as const },
  games: { filled: 'game-controller' as const, outlined: 'game-controller-outline' as const },
  profile: { filled: 'person-circle' as const, outlined: 'person-circle-outline' as const },
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background');
  const { isTabBarVisible, tabBarTranslateY } = useScroll();

  const iconColor = useThemeColor({}, 'textPrimary');
  const color = useThemeColor({}, 'textSecondary');
  const accentBackgroundColor = useThemeColor({}, 'accent') + '80';

  const styles = StyleSheet.create({
    iconFocused: {
      backgroundColor: accentBackgroundColor,
      color: iconColor,
      borderRadius: 20,
      width: 60,
      textAlign: 'center',
    },
    icon: {
      color,     
    }
  });

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarShowLabel: false,
        tabBarStyle: Platform.select({
          ios: {
            position: isTabBarVisible ? 'relative' : 'absolute',
            backgroundColor,
            transform: [{ translateY: tabBarTranslateY }],
          },
          default: {
            position: isTabBarVisible ? 'relative' : 'absolute',
            backgroundColor,
            transform: [{ translateY: tabBarTranslateY }],
            height: 40,
          },
        }),
      }}>
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons 
              name={focused ? tabIcons.messages.filled : tabIcons.messages.outlined} 
              size={28} 
              color={color} 
              style={focused ? styles.iconFocused : styles.icon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons 
              name={focused ? tabIcons.feed.filled : tabIcons.feed.outlined} 
              size={28} 
              color={color} 
              style={focused ? styles.iconFocused : styles.icon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="createCommunity"
        options={{
          title: 'Create Community',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons 
              name={focused ? tabIcons.createCommunity.filled : tabIcons.createCommunity.outlined} 
              size={28} 
              color={color} 
              style={focused ? styles.iconFocused : styles.icon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          title: 'Games',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons 
              name={focused ? tabIcons.games.filled : tabIcons.games.outlined} 
              size={28} 
              color={color} 
              style={focused ? styles.iconFocused : styles.icon}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons 
              name={focused ? tabIcons.profile.filled : tabIcons.profile.outlined} 
              size={28} 
              color={color} 
              style={focused ? styles.iconFocused : styles.icon}
            />
          ),
        }}
      />
    </Tabs>
  );
}
