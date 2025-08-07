import { Drawer } from 'expo-router/drawer';
import { Animated } from 'react-native';

import { DrawerContent } from '@/components/DrawerContent';
import { HomeHeaderDemo } from '@/components/HomeHeaderDemo';
import { ScrollProvider, useScroll } from '@/components/ScrollContext';

function HomeDrawerContent() {
  const { isHeaderVisible, headerTranslateY } = useScroll();

  return (
    <Drawer
      drawerContent={(props) => <DrawerContent/>}
      screenOptions={{
        headerShown: true,
        drawerStyle: {
          width: 320,
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
  );
}

export default function HomeLayout() {
  return (
    <ScrollProvider>
      <HomeDrawerContent />
    </ScrollProvider>
  );
}