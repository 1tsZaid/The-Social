import { Stack, router } from 'expo-router';
import { View, Text, Button } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text>Login Screen</Text>
      <Button title="GO to Login" onPress={() => router.replace('/login')} />
      <Button title="GO to Messaging" onPress={() => router.replace('/home/(tabs)/messages')} />
      <Button title="GO to feed" onPress={() => router.replace('/home/(tabs)/feed')} />
      <Button title="GO to Profile" onPress={() => router.replace('/profile')} />
      <Button title="GO to Discover" onPress={() => router.push('/discover')} />
      <Button title="GO to Create Community" onPress={() => router.push('/createCommunity')} />
      <Button title="GO to Game 1" onPress={() => router.push('/game1')} />
    </View>
  );
}