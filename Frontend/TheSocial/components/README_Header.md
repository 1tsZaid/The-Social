# Header Components

This directory contains modular header components for the social media app, designed to match the header shown in the attached image.

## Components

### HomeHeader
The main header component that combines a hamburger menu icon and a row of user avatars.

**Props:**
- `users?: User[]` - Array of user objects with id, imageUrl, and isActive properties
- `onMenuPress?: () => void` - Callback for hamburger menu press
- `onAvatarPress?: (userId: string) => void` - Callback for avatar press
- `height?: number` - Header height (default: 56)

**Usage:**
```tsx
import { HomeHeader } from '@/components/HomeHeader';

const users = [
  { id: '1', imageUrl: undefined, isActive: true },
  { id: '2', imageUrl: undefined, isActive: false },
  // ... more users
];

<HomeHeader
  users={users}
  onMenuPress={() => console.log('Menu pressed')}
  onAvatarPress={(userId) => console.log(`User ${userId} pressed`)}
  height={56}
/>
```

### HamburgerIcon
A customizable hamburger menu icon component.

**Props:**
- `onPress?: () => void` - Callback for press event
- `size?: number` - Icon size (default: 24)

### UserAvatar
A circular user avatar component with support for images and active states.

**Props:**
- `size?: number` - Avatar size (default: 40)
- `imageUrl?: string` - URL for user profile image
- `onPress?: () => void` - Callback for press event
- `isActive?: boolean` - Whether the user is active (adds border)

### UserAvatarsRow
A horizontal row of user avatars with configurable spacing and maximum visible count.

**Props:**
- `users: User[]` - Array of user objects
- `avatarSize?: number` - Size of each avatar (default: 40)
- `maxVisible?: number` - Maximum number of avatars to show (default: 7)
- `onAvatarPress?: (userId: string) => void` - Callback for avatar press

## Design Features

- **Theme Support**: All components use the `useThemeColor` hook for consistent theming
- **Modular Design**: Each component is self-contained and reusable
- **Responsive**: Components adapt to different screen sizes
- **Accessible**: Proper touch targets and press feedback
- **Customizable**: Flexible props for different use cases

## Integration

To integrate the header into your existing screens:

1. Import the `HomeHeader` component
2. Prepare your user data array
3. Add the header at the top of your screen
4. Handle the callback events as needed

Example integration in a feed screen:
```tsx
import { HomeHeader } from '@/components/HomeHeader';

export default function FeedScreen() {
  const [users, setUsers] = useState([]);
  
  return (
    <ThemedView style={styles.container}>
      <HomeHeader
        users={users}
        onMenuPress={handleMenuPress}
        onAvatarPress={handleAvatarPress}
      />
      {/* Your existing feed content */}
    </ThemedView>
  );
}
```

## Styling

The components follow the design specifications from the provided CSS:
- Header height: 56px
- Light grey background (#F1F3F4)
- Purple accent colors for avatars
- Proper spacing and alignment
- Border styling for active states

All styling is done using React Native StyleSheet and follows the existing theming system. 