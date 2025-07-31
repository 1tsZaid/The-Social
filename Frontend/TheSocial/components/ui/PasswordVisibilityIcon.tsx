import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useThemeColor } from '@/hooks/useThemeColor';

interface PasswordVisibilityIconProps {
  showPassword: boolean;
  onPress: () => void;
}

const PasswordVisibilityIcon: React.FC<PasswordVisibilityIconProps> = ({ showPassword, onPress }) => {
  const color = useThemeColor({}, 'borderDivider')
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialIcons
        name={showPassword ? 'visibility' : 'visibility-off'}
        size={18}
        color={color}
      />
    </TouchableOpacity>
  );
}

export default PasswordVisibilityIcon;
