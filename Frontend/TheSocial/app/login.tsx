import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Logo from '@/components/ui/Logo';
import LoginHeading from '@/components/LoginHeading';
import InputField from '@/components/InputField';
import ForgotPasswordLink from '@/components/ForgotPasswordLink';
import MainButton from '@/components/MainButton';
import OrDivider from '@/components/OrDivider';
import SocialLoginButton from '@/components/SocialLoginButton';
import SignUpLink from '@/components/SignUpLink';
import GoogleIcon from '@/components/ui/GoogleIcon';
import FacebookIcon from '@/components/ui/FacebookIcon';
import PasswordVisibilityIcon from '@/components/ui/PasswordVisibilityIcon';

import { useThemeColor } from '@/hooks/useThemeColor';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    Alert.alert('Login', `Email: ${email}\nPassword: ${password}`);
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Redirect to forgot password screen.');
  };

  const handleGoogleLogin = () => {
    Alert.alert('Google Login', 'Google login pressed.');
  };
  
  const handleFacebookLogin = () => {
    Alert.alert('Facebook Login', 'Facebook login pressed.');
  };
  
  const handleSignUp = () => {
    Alert.alert('Sign Up', 'Redirect to sign up screen.');
  };

  const backgroundColor = useThemeColor({}, 'background')
  
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor,
    },
    container: {
      flex: 1,
      justifyContent: "center",
    },
    inputSection: {
      height: 200,
      width: 300,
      alignSelf: "center",
    },
    mainButtonSection: {
      width: 300,
      alignSelf: "center",
    },
    dividerSection: {
      alignSelf: "center",
    },
    socialSection: {
      height: 150,
      width: 300,
      alignSelf: "center",
    },
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <Logo />
        <LoginHeading />
        <View style={styles.inputSection}>
          <InputField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="TheSocial@gmail.com"
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
          <ForgotPasswordLink onPress={handleForgotPassword} />
        </View>
        <View style={styles.mainButtonSection}>
          <MainButton title="Log in" onPress={handleLogin} />
        </View>
        <View style={styles.dividerSection}> 
          <OrDivider />
        </View>
        <View style={styles.socialSection}>
          <SocialLoginButton
            title="Continue with Google"
            icon={<GoogleIcon />}
            onPress={handleGoogleLogin}
          />
          <SocialLoginButton
            title="Continue with Facebook"
            icon={<FacebookIcon />}
            onPress={handleFacebookLogin}
          />
        </View>
        <SignUpLink onPress={handleSignUp} />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;