export const Colors = {
  light: {
    // Background colors
    background: '#F1F3F4',
    surface: '#FFFFFF',
    
    // Text colors
    textPrimary: '#202124',
    textSecondary: '#5F6368',
    
    // Accent colors
    accent: '#FFA500',
    
    // Border and divider colors
    borderDivider: '#BABCBE',

    // Other colors
    gold: '#FFD700',
    silver: '#A5A9B4',
    bronze: '#CD7F32',

    blue: '#2196F3',
    red: '#CE2029',
    green: '#34C759',
    purple: '#8B5FBF',
    magenta: '#FF6B9D',
    
    // Legacy support (keeping for backward compatibility)
    text: '#202124',
    tint: '#FFA500',
    icon: '#5F6368',
    tabIconDefault: '#5F6368',
    tabIconSelected: '#FFA500',
  },
  dark: {
    // Background colors
    background: '#000000',
    surface: '#1F1F1F',
    
    // Text colors
    textPrimary: '#FFFFFF',
    textSecondary: '#B3B3B3',
    
    // Accent colors
    accent: '#FF8000',

    // Border and divider colors
    borderDivider: '#414345',

    gold: '#FFD700',
    silver: '#A5A9B4',
    bronze: '#CD7F32',
    
    blue: '#2196F3',
    red: '#CE2029',
    green: '#30D158',
    purple: '#8B5FBF',
    magenta: '#FF6B9D',
    
    // Legacy support (keeping for backward compatibility)
    text: '#FFFFFF',
    tint: '#FF8000',
    icon: '#B3B3B3',
    tabIconDefault: '#B3B3B3',
    tabIconSelected: '#FF8000',
  },
  // Community banner colors
  community: {
    teal: '#20B2AA',
    blue: '#87CEEB',
    beige: '#F5DEB3',
    gray: '#696969',
  },
  
  // profile banner Colors
  profile: {
    blue: '#2196F3',
    red: '#CE2029',
  },

  games: {
    flappyBird: '#8AC048',
  },
};

// Theme type definitions for better TypeScript support
export type ThemeColors = typeof Colors.light;
export type ColorScheme = 'light' | 'dark';

// Helper function to get theme colors
export const getThemeColors = (colorScheme: ColorScheme): ThemeColors => {
  return Colors[colorScheme];
};
