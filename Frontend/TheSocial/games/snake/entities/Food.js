import React from 'react';
import { View } from 'react-native';

const INIT_POSITION = { x: 10, y: 10 };
const CELL_SIZE = 20;

export default function Food() {
  return {
    position: { ...INIT_POSITION },
    size: CELL_SIZE,
    renderer: ({ position, size }) => (
      <View
        style={{
          position: 'absolute',
          width: size,
          height: size,
          left: position.x * size,
          top: position.y * size,
          backgroundColor: 'red',
          borderRadius: size / 2,
          zIndex: 1,
        }}
      />
    ),
  };
}
