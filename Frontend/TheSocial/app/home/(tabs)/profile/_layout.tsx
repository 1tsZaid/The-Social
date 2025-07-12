import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function ProfileStack() {
  const router = useRouter();

  useEffect(() => {
    router.push('/profile');
  }, [router]);

  return null;
}
