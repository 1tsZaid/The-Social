import React from 'react';
import { TouchableOpacity, StyleSheet} from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface MainButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const MainButton: React.FC<MainButtonProps> = ({ title, onPress, disabled}) => {
  
  const theme = useColorScheme() ?? 'light';

  const backgroundColor = Colors[theme]['accent'];
  const borderColor = Colors.light.textPrimary;

  let borderShadow = Colors[theme][theme === 'dark' ? 'accent' : "textPrimary"];
  borderShadow = theme === 'dark' ? (borderShadow+'50') : borderShadow;

  const styles = StyleSheet.create({
    button: {
      paddingVertical: 8,
      paddingHorizontal: 24,
      height: 45,
      backgroundColor,
      borderColor,
      borderWidth: 3,
      borderRadius: 50,
    },
    text: {
      textAlign: 'center',
    },
  });

  return (
    <Shadow stretch={true} distance={0} startColor={borderShadow} endColor={borderShadow} offset={[4, 4]}>
      <TouchableOpacity
        style={[styles.button, disabled && { opacity: 0.6 }]}
        onPress={onPress}
        disabled={disabled}
      >
        <ThemedText style={styles.text} variant='button' colorType='textPrimary' lightColor='light' darkColor='dark'>{title}</ThemedText>
      </TouchableOpacity>
    </Shadow>
  )
};

export default MainButton; 