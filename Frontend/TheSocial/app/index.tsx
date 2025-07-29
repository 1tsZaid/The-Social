import { Stack, router } from 'expo-router';
import { View, Text, Button } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text>Login Screen</Text>
      <Button title="Login" onPress={() => router.replace('/login')} />
    </View>
  );
}