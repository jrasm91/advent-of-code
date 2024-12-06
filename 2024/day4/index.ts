import { readFileSync } from 'fs';

type Direction = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';
type Args = { x: number; y: number; word: string; direction: Direction };

const lines = readFileSync('./input.txt', 'utf8').trim();
const grid = lines.split('\n').map((line) => line.trim().split(''));
const directions: Direction[] = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
const pairs: Array<[Direction, Direction]> = [
  ['NW', 'SE'],
  ['NE', 'SW'],
  ['SE', 'NW'],
  ['SW', 'NE'],
];

const getCount = ({ x, y, word, direction }: Args): number => {
  if (!word) {
    return 1;
  }

  if (grid[x]?.[y] !== word[0]) {
    return 0;
  }

  let nextX = x;
  if (direction.includes('E')) {
    nextX++;
  }

  if (direction.includes('W')) {
    nextX--;
  }

  let nextY = y;
  if (direction.includes('N')) {
    nextY--;
  }

  if (direction.includes('S')) {
    nextY++;
  }

  return getCount({ x: nextX, y: nextY, word: word.slice(1), direction });
};

const part1 = () => {
  let count = 0;
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    for (let x = 0; x < row.length; x++) {
      for (const direction of directions) {
        count += getCount({ x, y, word: 'XMAS', direction });
      }
    }
  }
  console.log({ count });
};

const part2 = () => {
  let count = 0;
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    for (let x = 0; x < row.length; x++) {
      let current = 0;
      for (const [first, second] of pairs) {
        if (
          getCount({ x, y, word: 'AM', direction: first }) +
            getCount({ x, y, word: 'AS', direction: second }) ===
          2
        ) {
          current++;
        }
      }
      if (current === 2) {
        count++;
      }
    }
  }

  console.log({ count });
};

part2();
