import { useEffect } from 'react';
import { useRouter, usePathname } from 'expo-router';
import { useModal } from '@/components/ModalContext';

export default function CreateCommunityTabLayout() {
  const { openModal } = useModal();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/home/createCommunity') {
      router.replace('/home/(tabs)/messages');
      openModal('createCommunity');
    }
  });

  return null;
}
