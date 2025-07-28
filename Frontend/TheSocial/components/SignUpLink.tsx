import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface SignUpLinkProps {
  onPress: () => void;
}

const SignUpLink: React.FC<SignUpLinkProps> = ({ onPress }) => (
  <View style={styles.container}>
    <Text style={styles.text}>Don’t have an account? </Text>
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.link}>Sign Up</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    width: 364,
    height: 17,
    marginTop: 16,
    marginBottom: 8,
    backgroundColor: '#F1F3F4',
  },
  text: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 17,
    letterSpacing: -0.01,
    color: '#6C7278',
  },
  link: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 17,
    letterSpacing: -0.01,
    color: '#2196F3',
  },
});

export default SignUpLink; 