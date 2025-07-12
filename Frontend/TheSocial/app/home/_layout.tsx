import { Drawer } from 'expo-router/drawer';

export default function HomeLayout() {
  return (
    <Drawer>
      <Drawer.Screen name="(tabs)" options={{ title: 'Home' }} />
    </Drawer>
  );
}