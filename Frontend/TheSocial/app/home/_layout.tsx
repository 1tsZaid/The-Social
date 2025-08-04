import { Drawer } from 'expo-router/drawer';

import { DrawerContent } from '@/components/DrawerContent';

export default function HomeLayout() {
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
      <Drawer.Screen name="(tabs)" options={{ title: 'Home' }} />
    </Drawer>
  );
}