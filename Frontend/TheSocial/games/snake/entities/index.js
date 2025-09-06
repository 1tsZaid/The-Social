import Snake from './Snake';
import Food from './Food';

export default function createEntities() {
  return {
    snake: Snake(),
    food: Food(),
  };
}
