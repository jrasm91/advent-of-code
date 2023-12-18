import { readFileSync } from 'fs';

const filename = 'input.txt';
const [_seeds, ..._maps] = readFileSync(filename, 'utf8').trim().split('\n\n');

interface Day5Map {
  name: string;
  rules: Day5Rule[];
}

interface Day5Rule {
  source: number;
  destination: number;
  size: number;
}

const seeds = _seeds.replace('seeds: ', '').split(' ').map(Number);
const seedRanges: Array<{ start: number; size: number }> = [];
for (let i = 0; i < seeds.length; i += 2) {
  seedRanges.push({ start: seeds[i], size: seeds[i + 1] });
}
const maps: Day5Map[] = [];

for (const map of _maps) {
  const [name, ...rules] = map.split('\n');
  maps.push({
    name: name.split(' ')[0],
    rules: rules
      .map((rule) => rule.split(' ').map(Number))
      .map(([destination, source, size]) => ({ destination, source, size })),
  });
}

let min: number | null = null;

for (const seed of seedRanges) {
  console.log(`Processing seed range: start=${seed.start}, size=${seed.size}`);
  for (let i = seed.start; i < seed.start + seed.size; i++) {
    let id = i;
    for (const map of maps) {
      let newId: number | null = null;
      for (const rule of map.rules) {
        if (id >= rule.source && id < rule.source + rule.size) {
          newId = rule.destination + (id - rule.source);
          break;
        }
      }

      if (newId === null) {
        newId = id;
      }

      // console.log(`  ${(map.name + ':').padEnd(25)} ${newId}`);
      id = newId;
    }

    if (min === null || id < min) {
      min = id;
    }
  }
}

console.log({ min });

// console.dir({ seeds, maps }, { depth: 10 });
console.log('Done');
