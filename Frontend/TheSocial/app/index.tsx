import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { router, Stack } from 'expo-router';
import { getTokens } from '@/utils/tokenStorage';

export default function IndexScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const tokens = await getTokens(); // must be async
        if (tokens) {
          console.log('Tokens found, going to home');
          router.replace('/home/messages');
        } else {
          console.log('No tokens found, going to login');
          router.replace('/login');
        }
      } catch (error) {
        console.error('Error checking tokens', error);
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Stack.Screen options={{ headerShown: false }} />
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null; // Nothing to render, because we'll have navigated
}


// import { Stack, router } from 'expo-router';
// import { View, Text, Button } from 'react-native';

// export default function LoginScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Stack.Screen options={{ headerShown: false }} />
//       <Text>Login Screen</Text>
//       <Button title="GO to Login" onPress={() => router.replace('/login')} />
//       <Button title="GO to Messaging" onPress={() => router.replace('/home/(tabs)/messages')} />
//       <Button title="GO to feed" onPress={() => router.replace('/home/(tabs)/feed')} />
//       <Button title="GO to Profile" onPress={() => router.replace('/profile')} />
//       <Button title="GO to Discover" onPress={() => router.push('/discover')} />
//       <Button title="GO to Create Community" onPress={() => router.push('/createCommunity')} />
//       <Button title="GO to Game 1" onPress={() => router.push('/game1')} />
//       <Button title="GO to Post" onPress={() => router.push('/post')} />
//       <Button title="GO to Edit Profile" onPress={() => router.push('/editProfile')} />
//     </View>
//   );
// }