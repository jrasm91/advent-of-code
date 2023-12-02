import { readFileSync } from 'fs';

const lines = readFileSync('./input.txt', 'utf8').trim().split('\n');

const cards = lines.map(() => 1);

let total = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const [, data] = line.split(':').map((part) => part.trim());
  const parts = data.split('|').map((part) => part.trim());
  const [winners, numbers] = parts
    .map((part) => part.match(/(\d+)/g))
    //
    .filter((match) => !!match)
    .map((numbers) => numbers?.map((x) => Number(x))) as number[][];

  let score = 0;
  for (const x of numbers) {
    if (winners.includes(x)) {
      score++;
    }
  }

  for (let j = 1; j <= score; j++) {
    cards[i + j] += cards[i];
  }

  total += score === 0 ? 0 : 2 ** (score - 1);
}

console.log(`Total=${total}, Cards=${Object.values(cards).reduce((sum, value) => sum + value, 0)}`);
console.log('Done');
