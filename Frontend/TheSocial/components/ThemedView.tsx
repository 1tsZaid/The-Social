import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  backgroundType?: 'background' | 'surface';
};

export function ThemedView({ style, lightColor, darkColor, backgroundType = 'background', ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, backgroundType);
  // console.log(backgroundType);
  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
