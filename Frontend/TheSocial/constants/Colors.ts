export const Colors = {
  light: {
    // Background colors
    background: '#F1F3F4',
    surface: '#FAFAFA',
    
    // Text colors
    textPrimary: '#202124',
    textSecondary: '#5F6368',
    
    // Accent colors
    accent: '#FFA500',
    blue: '#2196F3',
    
    // Border and divider colors
    borderDivider: '#BABCBE',
    
    // Legacy support (keeping for backward compatibility)
    text: '#202124',
    tint: '#FFA500',
    icon: '#5F6368',
    tabIconDefault: '#5F6368',
    tabIconSelected: '#FFA500',
  },
  dark: {
    // Background colors
    background: '#1A1A1A',
    surface: '#292929',
    
    // Text colors
    textPrimary: '#FFFFFF',
    textSecondary: '#B3B3B3',
    
    // Accent colors
    accent: '#FF8000',
    blue: '#2196F3',
    
    // Border and divider colors
    borderDivider: '#444444',
    
    // Legacy support (keeping for backward compatibility)
    text: '#FFFFFF',
    tint: '#FF8000',
    icon: '#B3B3B3',
    tabIconDefault: '#B3B3B3',
    tabIconSelected: '#FF8000',
  },
};

// Theme type definitions for better TypeScript support
export type ThemeColors = typeof Colors.light;
export type ColorScheme = 'light' | 'dark';

// Helper function to get theme colors
export const getThemeColors = (colorScheme: ColorScheme): ThemeColors => {
  return Colors[colorScheme];
};
