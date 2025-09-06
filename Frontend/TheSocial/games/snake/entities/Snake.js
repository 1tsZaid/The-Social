import React from 'react';
import { View } from 'react-native';

const INIT_POSITION = [
  { x: 5, y: 5 },
  { x: 4, y: 5 },
];
const INIT_DIRECTION = 'RIGHT';
const CELL_SIZE = 20;

export default function Snake() {
  return {
    position: [...INIT_POSITION],
    direction: INIT_DIRECTION,
    size: CELL_SIZE,
    renderer: ({ position, size }) => (
      <>
        {position.map((segment, idx) => (
          <View
            key={idx}
            style={{
              position: 'absolute',
              width: size,
              height: size,
              left: segment.x * size,
              top: segment.y * size,
              backgroundColor: idx === 0 ? 'green' : 'lime',
              borderRadius: 4,
              zIndex: 2,
            }}
          />
        ))}
      </>
    ),
  };
}
