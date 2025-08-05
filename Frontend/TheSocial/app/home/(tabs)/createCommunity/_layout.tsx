import { useEffect } from 'react';
import { useModal } from '@/components/ModalContext';

export default function CreateCommunityTabLayout() {
  const { openModal } = useModal();

  useEffect(() => {
    openModal('createCommunity');
  }, [openModal]);

  return null;
}
