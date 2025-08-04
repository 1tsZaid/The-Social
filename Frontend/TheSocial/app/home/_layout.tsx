import { Drawer } from 'expo-router/drawer';

import { DrawerContent } from '@/components/DrawerContent';
import { HomeHeaderDemo } from '@/components/HomeHeaderDemo';

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
      <Drawer.Screen 
        name="(tabs)" 
        options={{ 
          title: 'Home',
          header: () => <HomeHeaderDemo />
        }} 
      />
    </Drawer>
  );
}