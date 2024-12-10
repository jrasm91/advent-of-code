import { readFileSync } from 'fs';

const input = readFileSync('./input.txt', 'utf8').trim();
const lines = input.split('\n');
const map = lines.map((line) => line.split(''));

type Point = { x: number; y: number };

const antennas: Record<string, Array<Point>> = {};
const antinodes = new Set<string>();

const antennaActive: Record<string, boolean> = {};

for (const [y, row] of map.entries()) {
  for (const [x, value] of row.entries()) {
    if (value === '.') {
      continue;
    }

    if (!antennas[value]) {
      antennas[value] = [];
    }

    antennas[value].push({ x, y });
  }
}

const debug = [...map.map((row) => [...row])];

for (const [label, points] of Object.entries(antennas)) {
  console.log(`Processing ${label}`);
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points.length; j++) {
      if (i === j) {
        continue;
      }

      const { x: x1, y: y1 } = points[i];
      const { x: x2, y: y2 } = points[j];

      const dx = x2 - x1;
      const dy = y2 - y1;

      let x = x2 + dx;
      let y = y2 + dy;

      while (true) {
        // console.log(` Generating anti-nodes from (${x1}, ${y1}), (${x2}, ${y2}) => (${x}, ${y})`);
        if (y >= 0 && y < map.length && x >= 0 && x < map[y].length) {
          antinodes.add(`${x},${y}`);
          antennaActive[label] = true;
          debug[y][x] = '#';

          x += dx;
          y += dy;

          continue;
        }

        break;
      }
    }
  }
}

// for (const row of debug) {
//   console.log(row.join(''));
// }

for (const [label] of Object.entries(antennaActive)) {
  for (const { x, y } of antennas[label]) {
    antinodes.add(`${x},${y}`);
  }
}

const total = antinodes.size;

console.log({ total });
