import { Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Typography, type TypographyVariant } from '@/constants/Typography';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  colorType?: 'textPrimary' | 'textSecondary'| 'blue';
  variant?: TypographyVariant;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  variant = 'body',
  colorType = 'textSecondary',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, colorType);
  const typographyStyle = Typography[variant];

  return (
    <Text
      style={[
        { color },
        typographyStyle,
        style,
      ]}
      {...rest}
    />
  );
}