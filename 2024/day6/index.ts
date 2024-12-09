import { readFileSync, writeFileSync } from 'fs';

const input = readFileSync('./input.txt', 'utf8').trim();
const map = input.split('\n').map((item) => item.trim().split(''));

type Point = { x: number; y: number };
enum Direction {
  UP = '^',
  DOWN = 'v',
  LEFT = '<',
  RIGHT = '>',
}

const findStart = (map: string[][]) => {
  for (const [y, row] of map.entries()) {
    for (const [x, cell] of row.entries()) {
      switch (cell) {
        case '>':
        case '<':
        case '^':
        case 'v': {
          return { point: { x, y }, direction: cell as Direction };
        }
      }
    }
  }

  throw new Error('Unable to find start');
};

const start = findStart(map);

const turnMap = {
  [Direction.UP]: Direction.RIGHT,
  [Direction.RIGHT]: Direction.DOWN,
  [Direction.DOWN]: Direction.LEFT,
  [Direction.LEFT]: Direction.UP,
};

const turn = (direction: Direction) => turnMap[direction];
const advance = (current: Point, direction: Direction) => {
  switch (direction) {
    case Direction.UP: {
      return { x: current.x, y: current.y - 1 };
    }

    case Direction.DOWN: {
      return { x: current.x, y: current.y + 1 };
    }

    case Direction.LEFT: {
      return { x: current.x - 1, y: current.y };
    }

    case Direction.RIGHT: {
      return { x: current.x + 1, y: current.y };
    }
  }
};

const create = (input: string[][]) => {
  let { point: current, direction } = start;
  const map = [...input.map((row) => [...row])];
  const visited = new Set<string>();

  const read = (point: Point) => map[point.y][point.x];
  const write = (point: Point, value: string) => (map[point.y][point.x] = value);
  const check = ({ x, y }: Point) => y >= 0 && y < map.length && x >= 0 && x < map[y].length;
  const debug = (filename: string) => {
    const value = read(start.point);
    write(start.point, start.direction);

    let output = [];

    for (const row of map) {
      output.push(row.join(''));
    }

    write(start.point, value);

    output.push('');

    writeFileSync(filename, output.join('\n'));
  };

  write(current, '.');

  const step = () => {
    if (!check(current)) {
      return { isDone: true, isNew: false, isDuplicate: false };
    }

    const visitedKey = `${current.x},${current.y},${direction}`;
    const isDuplicate = visited.has(visitedKey);
    visited.add(visitedKey);

    const value = read(current);
    const isNew = value === '.';
    if (isNew) {
      write(current, 'X');
    }

    while (true) {
      const next = advance(current, direction);
      if (check(next) && ['#', 'O'].includes(read(next))) {
        direction = turn(direction);
        continue;
      }

      break;
    }

    current = advance(current, direction);

    return { isDone: false, isNew, isDuplicate };
  };

  return { step, read, write, check, debug };
};

const part1 = () => {
  const { step, debug } = create(map);

  let total = 0;
  let count = 1;
  while (true) {
    const { isDone, isNew } = step();
    debug(`debug/${count++}.txt`);
    if (isNew) {
      total++;
    }

    if (isDone) {
      break;
    }
  }

  console.log({ total });
};

const part2 = () => {
  let total = 0;
  const { point: startPoint, direction } = start;
  const next = advance(startPoint, direction);
  for (const [y, row] of map.entries()) {
    for (const [x, cell] of row.entries()) {
      const { step, read, write, debug } = create(map);

      if (
        // ignore guard
        (x === startPoint.x && y === startPoint.y) ||
        // ignore space in front of guard
        // (x === next.x && y == next.y) ||
        // ignore obstacles
        read({ x, y }) !== '.'
      ) {
        continue;
      }

      write({ x, y }, 'O');

      while (true) {
        const { isDone, isDuplicate } = step();
        if (isDuplicate) {
          total++;
          break;
        }

        if (isDone) {
          break;
        }
      }
    }
  }
  console.log({ total });
};

part2();
