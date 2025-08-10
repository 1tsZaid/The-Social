import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ScrollView,
  Dimensions
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

type BottomModalProps = {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function BottomModal({ isVisible, onClose, children }: BottomModalProps) {

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

  const dragHandleColor = useThemeColor({}, 'textSecondary');
  
  const styles = StyleSheet.create({
    parentView: {
    },
    modalView: {
      borderRadius: 20,
      alignItems: 'center',
    },
    scrollView: {
      width: '100%',
      height: SCREEN_HEIGHT * 0.8,
    },
    closeButton: {
      position: 'absolute',
      top: 8,
      right: 16,
      zIndex: 10,
      width: 32,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dragHandle: {
      position: 'absolute',
      top: 12,
      alignSelf: 'center',
      width: 40,
      height: 4,
      backgroundColor: dragHandleColor,
      borderRadius: 2,
      zIndex: 5,
    },
  });

  return (
    <View style={styles.parentView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
      >
          <View style={styles.modalView}>
            <Pressable 
              style={styles.closeButton} 
              onPress={onClose} 
              accessibilityLabel="Close modal"
            >
              <ThemedText variant='h1' colorType='textSecondary'>×</ThemedText>
            </Pressable>
            <View style={styles.dragHandle} />
            <ScrollView style={styles.scrollView}>
              {children}
            </ScrollView>
          </View>
      </Modal>
    </View>
  );
}
