import { useModal } from '@/components/ModalContext';
import { useRouter, usePathname } from 'expo-router';

export default function CreateCommunityTabLayout() {
  const { openModal } = useModal();
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === '/home/createCommunity') {
    router.replace('/home/(tabs)/messages');
    openModal('createCommunity');
  }
  console.log(pathname);

  return null;
}
