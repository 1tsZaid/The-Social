import React, { useState } from 'react';
import { router } from 'expo-router';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Logo from '@/components/ui/Logo';
import FormHeading from '@/components/FormHeading';
import MainButton from '@/components/MainButton';
import InputField from '@/components/InputField';
import FormLinkSection from '@/components/FormLinkSection';
import PasswordVisibilityIcon from '@/components/ui/PasswordVisibilityIcon';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { register } from '@/services/auth';
import { saveTokens } from '@/utils/tokenStorage';

import { useModal } from '@/components/ModalContext';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rePassword, setRePassword] = useState('');
  const [showRePassword, setShowRePassword] = useState(false);
  const [username, setUsername] = useState('');

  const { openModal } = useModal();
  
  const backgroundColor = useThemeColor({}, 'background')

  const handleRegister = async () => {
    try {
      // Randomly select a profile banner color
      const profileBannerColors = Object.values(Colors.profile);
      const randomIndex = Math.floor(Math.random() * profileBannerColors.length);
      const banner = profileBannerColors[randomIndex];

      // Call the register function
      const response = await register({
        email,
        password,
        username,
        banner,
      });

      if (response?.accessToken && response?.refreshToken) {
        await saveTokens({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        });
      }

      // Handle the response
      console.log(response);
      router.replace('/home/messages');
      openModal('discover');
    } catch (error: unknown) {
        console.error(error);

        let message = 'An unexpected error occurred';
        if (error instanceof Error) {
          message = error.message;
        } else if (typeof error === 'string') {
          message = error;
        } else if (error && typeof error === 'object' && 'message' in error) {
          message = String((error as any).message);
        }

        Alert.alert('Error', message);
      }

  };
  
  const handleLogIn = () => {
    router.replace('/login');
  };
  
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor,
    },
    scrollContainer: {
      flexGrow: 1,
    },
    container: {
      flex: 1,
      justifyContent: "center",
    },
    logoContainer: {
      flex: 1,
      minHeight: 100,
      maxHeight: 150,
      justifyContent: "center",
    },
    headingSection: {
        width: 325,
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 40,
    },
    inputSection: {
      height: 350,
      width: 300,
      alignSelf: "center",
    },
    mainButtonSection: {
      width: 300,
      alignSelf: "center",
      marginBottom: 10,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea} >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
      >
        <View style={styles.container}>  
          <View style={styles.logoContainer}>
            <Logo />
          </View>
          <View style={styles.headingSection}>
            <FormHeading textAlign='left' heading='CREATE NEW ACCOUNT' caption='Ready to make some new connections?'/>
          </View>
          <View style={styles.inputSection}>
            <InputField
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="TheSocial@gmail.com"
              secureTextEntry={false}
            />
            <InputField
              label="Username"
              value={username}
              onChangeText={setUsername}
              placeholder="SocialUser123"
              secureTextEntry={false}
            />
            <InputField
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry={!showPassword}
              rightIcon={
                <PasswordVisibilityIcon
                  showPassword={showPassword}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
            <InputField
              label="Re-type Password"
              value={rePassword}
              onChangeText={setRePassword}
              placeholder="Password"
              secureTextEntry={!showRePassword}
              rightIcon={
                <PasswordVisibilityIcon
                  showPassword={showRePassword}
                  onPress={() => setShowRePassword(!showRePassword)}
                />
              }
            />
          </View>
          <View style={styles.mainButtonSection}>
            <MainButton title="Register" onPress={handleRegister} />
          </View>
          <FormLinkSection onPress={handleLogIn} linkText={"Log In"}>Already have an account?</FormLinkSection>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;