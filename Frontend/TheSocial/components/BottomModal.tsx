import React from 'react';
import Modal from 'react-native-modal';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';

import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor';


type BottomModalProps = {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function BottomModal({ isVisible, onClose, children }: BottomModalProps) {
    const dragHandleColor = useThemeColor({}, 'textSecondary');

    const styles = StyleSheet.create({
      modal: {
        flex: 1,
        justifyContent: 'flex-end',
        margin: 0,
      },
      content: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        minHeight: 200,
        maxHeight: '90%',
        paddingTop: 32,
      },
      scrollView: {
        flex: 1,
      },
      scrollContent: {
        paddingHorizontal: 16,
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
        left: '50%',
        marginLeft: -20,
        width: 40,
        height: 4,
        backgroundColor: dragHandleColor,
        borderRadius: 2,
        zIndex: 5,
      },
    });

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      swipeDirection="down"
      onSwipeComplete={onClose}
      backdropOpacity={0.3}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriver
    >
      <ThemedView style={styles.content} backgroundType='background'>
        <TouchableOpacity style={styles.closeButton} onPress={onClose} accessibilityLabel="Close modal">
          <ThemedText variant='h1' colorType='textSecondary'>×</ThemedText>
        </TouchableOpacity>
        <View style={styles.dragHandle} />
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </ThemedView>
    </Modal>
  );
}
