import { readFileSync } from 'fs';

const lines = readFileSync('./input.txt', 'utf8').trim().split('\n');

const first: number[] = [];
const second: number[] = [];
const secondMap: Record<number, number> = {};

for (const line of lines) {
  const [a, b] = line.split(/\s+/).map(Number);
  first.push(a);
  second.push(b);

  if (!secondMap[b]) {
    secondMap[b] = 0;
  }

  secondMap[b]++;
}

first.sort();
second.sort();

let difference = 0;
let similarity = 0;
for (let i = 0; i < first.length; i++) {
  const a = first[i];
  const b = second[i];
  difference += Math.abs(a - b);
  similarity += a * (secondMap[a] ?? 0);
}

console.log({ difference, similarity });
