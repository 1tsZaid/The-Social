import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';
import { Animated, Easing } from 'react-native';

type ScrollContextType = {
  isHeaderVisible: boolean;
  isTabBarVisible: boolean;
  headerTranslateY: Animated.Value;
  tabBarTranslateY: Animated.Value;
  setHeaderVisible: (visible: boolean) => void;
  setTabBarVisible: (visible: boolean) => void;
  handleScroll: (event: any) => void;
};

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export function useScroll() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error('useScroll must be used within ScrollProvider');
  return ctx;
}

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [isHeaderVisible, setHeaderVisible] = useState(true); // Start with header hidden
  const [isTabBarVisible, setTabBarVisible] = useState(true);
  const lastScrollY = useRef(0);
  const headerTranslateY = useRef(new Animated.Value(0)).current; // Start hidden
  const tabBarTranslateY = useRef(new Animated.Value(0)).current;

  const handleScroll = (event: any) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    const scrollingUp = currentScrollY < lastScrollY.current;
    const scrollingDown = currentScrollY > lastScrollY.current;
    const isAtTop = currentScrollY <= 0;
    const scrollThreshold = 50;

    // Always show header when at top
    if (isAtTop) {
      if (!isHeaderVisible) {
        setHeaderVisible(true);
        Animated.timing(headerTranslateY, {
          toValue: 0,
          useNativeDriver: true,
          duration: 300,
          easing: Easing.out(Easing.cubic),
        }).start();
      }
      if (!isTabBarVisible) {
        setTabBarVisible(true);
        Animated.timing(tabBarTranslateY, {
          toValue: 0,
          useNativeDriver: true,
          duration: 300,
          easing: Easing.out(Easing.cubic),
        }).start();
      }
    } else if (scrollingUp && currentScrollY > scrollThreshold) {
      // Show header when scrolling up (after threshold)
      if (!isHeaderVisible) {
        setHeaderVisible(true);
        Animated.timing(headerTranslateY, {
          toValue: 0,
          useNativeDriver: true,
          duration: 300,
          easing: Easing.out(Easing.cubic),
        }).start();
      }
      if (!isTabBarVisible) {
        setTabBarVisible(true);
        Animated.timing(tabBarTranslateY, {
          toValue: 0,
          useNativeDriver: true,
          duration: 300,
          easing: Easing.out(Easing.cubic),
        }).start();
      }
    } else if (scrollingDown && currentScrollY > scrollThreshold) {
      // Hide header when scrolling down (after threshold)
      if (isHeaderVisible) {
        setHeaderVisible(false);
        Animated.timing(headerTranslateY, {
          toValue: -100,
          useNativeDriver: true,
          duration: 300,
          easing: Easing.out(Easing.cubic),
        }).start();
      }
      if (isTabBarVisible) {
        setTabBarVisible(false);
        Animated.timing(tabBarTranslateY, {
          toValue: 100,
          useNativeDriver: true,
          duration: 300,
          easing: Easing.out(Easing.cubic),
        }).start();
      }
    }

    lastScrollY.current = currentScrollY;
  };

  return (
    <ScrollContext.Provider value={{
      isHeaderVisible,
      isTabBarVisible,
      headerTranslateY,
      tabBarTranslateY,
      setHeaderVisible,
      setTabBarVisible,
      handleScroll,
    }}>
      {children}
    </ScrollContext.Provider>
  );
} 