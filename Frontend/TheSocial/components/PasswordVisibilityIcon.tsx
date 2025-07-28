import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface PasswordVisibilityIconProps {
  showPassword: boolean;
  onPress: () => void;
}

const PasswordVisibilityIcon: React.FC<PasswordVisibilityIconProps> = ({ showPassword, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <MaterialIcons
      name={showPassword ? 'visibility' : 'visibility-off'}
      size={18}
      color={Colors.light.borderDivider}
    />
  </TouchableOpacity>
);

export default PasswordVisibilityIcon;
