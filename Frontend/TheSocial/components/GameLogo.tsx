import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

interface GameLogoProps {
  imageUrl?: string;
  size?: 'small' | 'medium' | 'large';
}

const GameLogo: React.FC<GameLogoProps> = ({ 
  imageUrl,
  size = 'medium'
}) => {
  const backgroundColor = useThemeColor({}, 'surface');
  
  const sizeStyles = {
    small: { width: 64, height: 64 },
    medium: { width: 96, height: 96 },
    large: { width: 120, height: 120 }
  };
  
  const currentSize = sizeStyles[size];
  
  return (
    <View style={[
      styles.gameLogo, 
      { 
        backgroundColor,
        width: currentSize.width,
        height: currentSize.height
      }
    ]}>
      <Image 
        source={imageUrl ? { uri: imageUrl } : require('@/assets/images/thesocial-logo.png')}
        style={styles.logoImage}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  gameLogo: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
});

export default GameLogo; 