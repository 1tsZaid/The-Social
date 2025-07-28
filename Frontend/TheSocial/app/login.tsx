import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import Logo from '@/components/Logo';
import LoginHeading from '@/components/LoginHeading';
import InputField from '@/components/InputField';
import ForgotPasswordLink from '@/components/ForgotPasswordLink';
import MainButton from '@/components/MainButton';
import OrDivider from '@/components/OrDivider';
import SocialLoginButton from '@/components/SocialLoginButton';
import SignUpLink from '@/components/SignUpLink';
import GoogleIcon from '@/components/GoogleIcon';
import FacebookIcon from '@/components/FacebookIcon';

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Logo />
          <LoginHeading />
          <View style={styles.inputSection}>
            <InputField
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Loisbecket@gmail.com"
              secureTextEntry={false}
            />
            <InputField
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry={!showPassword}
              rightIcon={
                <View style={{ width: 16, height: 16, backgroundColor: '#ACB5BB', borderRadius: 8 }} />
              }
            />
            <ForgotPasswordLink onPress={handleForgotPassword} />
          </View>
          <MainButton title="Log in" onPress={handleLogin} />
          <OrDivider />
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F1F3F4',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F3F4',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 0,
    gap: 32,
    marginVertical: 32,
    width: 380,
    backgroundColor: '#F1F3F4',
  },
  inputSection: {
    width: 380,
    marginBottom: 8,
  },
  socialSection: {
    width: 380,
    marginTop: 8,
  },
});

export default LoginScreen;
