import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

type BottomModalProps = {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function BottomModal({ isVisible, onClose, children }: BottomModalProps) {
  const dragHandleColor = useThemeColor({}, 'textSecondary');
  
  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    backdrop: {
      flex: 1,
    },
    content: {
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      paddingTop: 32,
      maxHeight: SCREEN_HEIGHT * 0.85,
      minHeight: 200,
    },
    scrollView: {
      flex: 1,
      paddingHorizontal: 16,
      paddingBottom: 16,
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
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={onClose}
        />
        <ThemedView style={styles.content} backgroundType='background'>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={onClose} 
            accessibilityLabel="Close modal"
          >
            <ThemedText variant='h1' colorType='textSecondary'>×</ThemedText>
          </TouchableOpacity>
          <View style={styles.dragHandle} />
          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 8 }}
          >
            {children}
          </ScrollView>
        </ThemedView>
      </View>
    </Modal>
  );
}