import React, { useState } from 'react';
import { router } from 'expo-router';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Logo from '@/components/ui/Logo';
import FormHeading from '@/components/FormHeading';
import MainButton from '@/components/MainButton';
import InputField from '@/components/InputField';
import PasswordVisibilityIcon from '@/components/ui/PasswordVisibilityIcon';

import { useThemeColor } from '@/hooks/useThemeColor';
import { getTokens, deleteTokens } from '@/utils/tokenStorage';
import { clearMessages } from '@/utils/messageStorage';

import { useCommunities } from '@/components/CommunitiesContext';
import { useLeaderboard } from '@/components/LeaderboardContext';

import socket from '@/services/socket';
import { changePassword } from '@/services/auth';

const ChangePasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [reNewPassword, setReNewPassword] = useState('');
  const [showReNewPassword, setShowReNewPassword] = useState(false);
  const { resetCommunities } = useCommunities();
  const { resetLeaderboard } = useLeaderboard();

  const backgroundColor = useThemeColor({}, 'background');

  const handleChangePassword = async () => {
    if (!email || !oldPassword || !newPassword || !reNewPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    if (newPassword !== reNewPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }
    try {
        
      await changePassword({ email, password: oldPassword, newPassword });
      Alert.alert('Success', 'Password changed successfully');

      // Clear Communities Context
      clearMessages();
      resetCommunities();
      resetLeaderboard();    

      const tokens = await getTokens();
      console.log('Tokens before logout:', tokens);
      socket.disconnect('/chat');

      console.log('User delete');
      await deleteTokens();
      console.log('Tokens after user delete:', await getTokens());
      router.replace('/login');

    } catch (error: unknown) {
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
            <FormHeading textAlign='left' heading='CHANGE PASSWORD' caption='Update your password securely.'/>
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
              label="Current Password"
              value={oldPassword}
              onChangeText={setOldPassword}
              placeholder="Current Password"
              secureTextEntry={!showOldPassword}
              rightIcon={
                <PasswordVisibilityIcon
                  showPassword={showOldPassword}
                  onPress={() => setShowOldPassword(!showOldPassword)}
                />
              }
            />
            <InputField
              label="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="New Password"
              secureTextEntry={!showNewPassword}
              rightIcon={
                <PasswordVisibilityIcon
                  showPassword={showNewPassword}
                  onPress={() => setShowNewPassword(!showNewPassword)}
                />
              }
            />
            <InputField
              label="Re-type New Password"
              value={reNewPassword}
              onChangeText={setReNewPassword}
              placeholder="Re-type New Password"
              secureTextEntry={!showReNewPassword}
              rightIcon={
                <PasswordVisibilityIcon
                  showPassword={showReNewPassword}
                  onPress={() => setShowReNewPassword(!showReNewPassword)}
                />
              }
            />
          </View>
          <View style={styles.mainButtonSection}>
            <MainButton title="Change Password" onPress={handleChangePassword} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;