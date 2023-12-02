import { readFileSync } from 'fs';

const lines = readFileSync('./input.txt', 'utf8')
  .trim()
  .split('\n')
  .map((line) => line.trim().split(''));

const lookup = (x: number, y: number) => lines[x]?.[y] || null;
const isDigit = (char: string) => !isNaN(Number(char));
const isGear = (char: string) => char === '*';
const isPeriod = (char: string) => char === '.';

let gears: Record<string, number[]> = {};
let total = 0;
const check = (row: number, start: number, end: number) => {
  const line = lines[row];
  const num = Number(line.join('').slice(start, end + 1));

  // console.log(`Checking ${num}`);

  let special = false;
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = start - 1; j <= end + 1; j++) {
      const char = lookup(i, j);
      if (!char) {
        continue;
      }

      // console.log(`  ${i},${j} => ${isSpecialChar(i, j)}`);
      if (!isDigit(char) && !isPeriod(char)) {
        special = true;
        if (isGear(char)) {
          const key = `${i},${j}`;
          if (!gears[key]) {
            gears[key] = [];
          }
          gears[key].push(num);
        }
      }
    }
  }
  // console.log(`Checking ${num} => ${special}`);

  if (special) {
    total += num;
  }
};

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  let index: number | null = null;
  for (let j = 0; j < line.length; j++) {
    const char = lookup(i, j);
    if (char && isDigit(char)) {
      if (index === null) {
        index = j;
      } else {
        continue;
      }
    } else {
      if (index === null) {
        continue;
      } else {
        check(i, index, j - 1);
        index = null;
      }
    }
  }

  if (index) {
    check(i, index, line.length - 1);
  }

  index = null;
}

// console.log('Gears', JSON.stringify(gears, null, 2));

console.log(
  `Total=${total}, Gears=${Object.values(gears)
    .filter((gear) => gear.length === 2)
    .map(([first, second]) => first * second)
    .flat()
    .reduce((sum, value) => sum + value, 0)}`,
);
console.log('Done');
