import { Drawer } from 'expo-router/drawer';
import { Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DrawerContent } from '@/components/DrawerContent';
import { HomeHeaderDemo } from '@/components/HomeHeaderDemo';
import { CommunitiesProvider } from '@/components/CommunitiesContext';
import { ScrollProvider, useScroll } from '@/components/ScrollContext';

import { useThemeColor } from '@/hooks/useThemeColor';

function HomeDrawerContent() {
  const { isHeaderVisible, headerTranslateY } = useScroll();

  const backgroundColor = useThemeColor({}, 'background');

  return (
    <SafeAreaView style={{flex: 1, backgroundColor,}} >
      <Drawer
        drawerContent={(props) => <DrawerContent/>}
        screenOptions={{
          headerShown: true,
          drawerStyle: {
            width: 300,
          },
        }}
      >
        <Drawer.Screen 
          name="(tabs)" 
          options={{ 
            title: 'Home',
            header: () => (
              <Animated.View
                style={{
                  transform: [{ translateY: headerTranslateY }],
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  zIndex: 1000,
                }}
              >
                <HomeHeaderDemo />
              </Animated.View>
            )
          }} 
        />
      </Drawer>
    </SafeAreaView>
  );
}

export default function HomeLayout() {
  return (
    <ScrollProvider>
      <CommunitiesProvider>
        <HomeDrawerContent />
      </CommunitiesProvider>
    </ScrollProvider>
  );
}