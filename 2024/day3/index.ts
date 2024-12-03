import { readFileSync } from 'fs';

const line = readFileSync('./input.txt', 'utf8').trim();
const results = line.match(/(mul\([0-9]{1,3},[0-9]{1,3}\)|do\(\)|don\'t\(\))/g) || [];

let enabled = true;
let total = 0;
for (const result of results) {
  console.log(result);
  if (result === 'do()') {
    enabled = true;
  }

  if (result === "don't()") {
    enabled = false;
  }

  if (result.startsWith('mul') && enabled) {
    const [a, b] = result.slice(4, -1).split(',').map(Number);
    total += a * b;
  }
}

console.log(total);
