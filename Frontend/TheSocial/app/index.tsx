import { Stack, router } from 'expo-router';
import { View, Text, Button } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text>Login Screen</Text>
      <Button title="GO to Login" onPress={() => router.replace('/login')} />
      <Button title="GO to Discover" onPress={() => router.replace('/discover')} />
      <Button title="GO to Profile" onPress={() => router.replace('/profile')} />
    </View>
  );
}