import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';
import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_800ExtraBold,
} from '@expo-google-fonts/montserrat';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

import { useColorScheme } from '@/hooks/useColorScheme';
import { ModalProvider, useModal } from '@/components/ModalContext';
import BottomModal from '@/components/BottomModal';
import CustomBackButton from '@/components/CustomBackButton';
import CreateCommunityScreen from './createCommunity';
import DiscoverScreen from './discover';
import GameScreen from './game1';

function ModalRoot() {
  const { modal, closeModal } = useModal();
  return (
    <BottomModal isVisible={!!modal} onClose={closeModal}>
      {modal === 'createCommunity' && <CreateCommunityScreen />}
      {modal === 'discover' && <DiscoverScreen />}
      {modal === 'game1' && <GameScreen />}
    </BottomModal>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Montserrat-Regular': Montserrat_400Regular,
    'Montserrat-SemiBold': Montserrat_600SemiBold,
    'Montserrat-ExtraBold': Montserrat_800ExtraBold,
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Medium': Poppins_500Medium,
    'Poppins-SemiBold': Poppins_600SemiBold,
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <ModalProvider>
          <Stack 
            screenOptions={{ 
              headerShown: false,
            }}
          >
            <Stack.Screen 
              name="profile" 
              options={{ 
                headerShown: true,
                title: '',
                headerTransparent: true,
                headerLeft: () => <CustomBackButton />,
                headerTitleStyle: {
                  fontWeight: '600',
                },
              }} 
            />
            
          </Stack>
          <ModalRoot />
        </ModalProvider>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}