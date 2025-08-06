import { useRouter, usePathname } from 'expo-router';

export default function ProfileStack() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === '/home/profile') {
    router.replace('/home/(tabs)/messages');
    router.push('/profile');
  }

  return null;
}
