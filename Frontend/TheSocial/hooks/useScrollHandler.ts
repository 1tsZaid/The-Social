import { useScroll } from '@/components/ScrollContext';
import { useCallback } from 'react';

export function useScrollHandler() {
  const { handleScroll } = useScroll();

  const onScroll = useCallback((event: any) => {
    handleScroll(event);
  }, [handleScroll]);

  return { onScroll };
} 