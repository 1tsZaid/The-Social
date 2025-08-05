import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background');

  const iconColor = useThemeColor({}, 'textPrimary');
  const color = useThemeColor({}, 'textSecondary');
  const accentBackgroundColor = useThemeColor({}, 'accent') + '50';

  const styles = StyleSheet.create({
    iconFocused: {
      backgroundColor: accentBackgroundColor,
      color: iconColor,
      borderRadius: 20,
      width: 60,
      padding: 5,
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
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
            backgroundColor,
          },
          default: {
            backgroundColor,
          },
        }),
      }}>
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ focused, color }) => <MaterialIcons name="forum" size={28} color={color} style={focused ? styles.iconFocused : styles.icon}/>,
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ focused, color }) => <MaterialIcons name="web-stories" size={28} color={color} style={focused ? styles.iconFocused : styles.icon}/>,
        }}
      />
      <Tabs.Screen
        name="createCommunity"
        options={{
          title: 'Create Community',
          tabBarIcon: ({ focused, color }) => <MaterialIcons name="add-circle" size={28} color={color} style={focused ? styles.iconFocused : styles.icon}/>,
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          title: 'Games',
          tabBarIcon: ({ focused,  color }) => <MaterialIcons name="sports-esports" size={28} color={color} style={focused ? styles.iconFocused : styles.icon}/>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color }) => <MaterialIcons name="account-circle" size={28} color={color} style={focused ? styles.iconFocused : styles.icon}/>,
        }}
      />
    </Tabs>
  );
}
