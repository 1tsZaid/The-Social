import React from 'react';
import { View, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';

interface FormHeadingProps {
  textAlign: "auto" | "left" | "right" | "center" | "justify" | undefined;
  heading: string;
  caption: string;
}

const FormHeading: React.FC<FormHeadingProps> = ({textAlign, heading, caption}) => {
  
  const styles = StyleSheet.create({
    container: {
      height: 100,
    },
    heading: {
      textAlign,
    },
    subtitle: {
      textAlign,
      marginTop: 5,
    },
  });
  
  return (
    <View style={styles.container}>
      <ThemedText style={styles.heading} variant='h1' colorType='textPrimary'>{heading}</ThemedText>
      <ThemedText style={styles.subtitle} variant='caption'>{caption}</ThemedText>
    </View>
  );
}


export default FormHeading; 