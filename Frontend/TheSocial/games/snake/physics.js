import { getRandomInt } from '@/utils/random';

const BOARD_SIZE = 20;
const MOVE_INTERVAL = 100;

function getNextHead(snake, direction) {
  const head = { ...snake[0] };
  switch (direction) {
    case 'UP': head.y -= 1; break;
    case 'DOWN': head.y += 1; break;
    case 'LEFT': head.x -= 1; break;
    case 'RIGHT': head.x += 1; break;
  }
  return head;
}

function isCollision(pos, snake) {
  return (
    pos.x < 0 || pos.x >= BOARD_SIZE ||
    pos.y < 0 || pos.y >= BOARD_SIZE ||
    snake.some(seg => seg.x === pos.x && seg.y === pos.y)
  );
}

function randomFood(snake) {
  let pos;
  do {
    pos = { x: getRandomInt(0, BOARD_SIZE - 1), y: getRandomInt(0, BOARD_SIZE - 1) };
  } while (snake.some(seg => seg.x === pos.x && seg.y === pos.y));
  return pos;
}

let lastMove = 0;

export default function Physics(entities, { time, dispatch, events }) {
  const snake = entities.snake;
  const food = entities.food;

  // console.log('Physics tick', time.current, snake.position[0], snake.direction);

  if (events && events.length) {
    events.forEach(e => {
      if (e.type === 'change_direction') {
        // Prevent reversing
        const opposite = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' };
        if (snake.direction !== opposite[e.direction]) {
          snake.direction = e.direction;
        }
        // console.log('Direction changed to', snake.direction);
      }
    });
  }

  if (!snake.position || !snake.direction) return entities;

  if (!lastMove || time.current - lastMove > MOVE_INTERVAL) {
    lastMove = time.current;
    const nextHead = getNextHead(snake.position, snake.direction);
    if (isCollision(nextHead, snake.position)) {
      dispatch({ type: 'game_over' });
      return entities;
    }
    snake.position.unshift(nextHead);
    if (nextHead.x === food.position.x && nextHead.y === food.position.y) {
      dispatch({ type: 'new_point' });
      food.position = randomFood(snake.position);
    } else {
      snake.position.pop();
    }
  }
  return entities;
}
