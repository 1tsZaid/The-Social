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

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rePassword, setRePassword] = useState('');
  const [showRePassword, setShowRePassword] = useState(false);

  const handleRegister = () => {
    // Alert.alert('Register', `Email: ${email}\nPassword: ${password}Re-Password: ${rePassword}`);
    router.replace('/home/messages');
  };
  
  const handleLogIn = () => {
    router.replace('/login');
  };

  const backgroundColor = useThemeColor({}, 'background')
  
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor,
    },
    scrollContainer: {
      flex: 1,
    },
    container: {
      flex: 1,
      justifyContent: "center",
    },
    headingSection: {
        width: 325,
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 40,
    },
    inputSection: {
      height: 275,
      width: 300,
      alignSelf: "center",
    },
    mainButtonSection: {
      width: 300,
      alignSelf: "center",
      marginBottom: 100,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'right', 'bottom', 'left']}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>  
          <Logo />
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