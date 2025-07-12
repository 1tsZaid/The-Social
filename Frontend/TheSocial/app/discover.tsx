import { Stack, router } from 'expo-router';
import { View, Text, Button } from 'react-native';

export default function DiscoverScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text>Discover Screen</Text>
      <Button title="Go to Home" onPress={() => router.replace('/home')} />
    </View>
  );
}