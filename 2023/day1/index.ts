import { readFileSync } from 'fs';

const lines = readFileSync('./input.txt', 'utf8').split('\n');
const replacers = [
  { word: 'one', value: 1 },
  { word: 'two', value: 2 },
  { word: 'three', value: 3 },
  { word: 'four', value: 4 },
  { word: 'five', value: 5 },
  { word: 'six', value: 6 },
  { word: 'seven', value: 7 },
  { word: 'eight', value: 8 },
  { word: 'nine', value: 9 },
];

type Result = { index: number; value: number };
type Results = { first: Result | null; last: Result | null };

const findDigits = (line: string): Results => {
  const match = line.match(/(\d)/g);
  let first: string | null = null;
  let last: string | null = null;
  if (match) {
    first = match[0];
    last = match[match.length - 1];
  }

  return {
    first: first ? { index: line.indexOf(first), value: Number(first) } : null,
    last: last ? { index: line.lastIndexOf(last), value: Number(last) } : null,
  };
};

const findWords = (line: string): Results => {
  let first: (Result & { word: string }) | null = null;
  let results = replacers.map(({ value, word }) => ({ word, value, index: line.indexOf(word) }));
  for (const result of results) {
    if (result.index === -1) {
      continue;
    }

    if (!first || result.index < first.index) {
      first = result;
      continue;
    }
  }

  let last = first;
  results = replacers.map(({ value, word }) => ({ word, value, index: line.lastIndexOf(word) }));
  for (const result of results) {
    if (result.index === -1) {
      continue;
    }

    if (!last || result.index > last.index) {
      last = result;
      continue;
    }
  }

  return { first, last };
};

let total = 0;
for (const line of lines) {
  const digits = findDigits(line);
  const words = findWords(line);

  // console.log({ digits, words });

  let first = digits.first;
  if (words.first && (!first || words.first.index < first.index)) {
    first = words.first;
  }

  let last = digits.last;
  if (words.last && (!last || words.last.index > last.index)) {
    last = words.last;
  }

  if (!first || !last) {
    // throw new Error(`woops: ${line}`);
    continue;
  }

  const value = Number(`${first.value}${last.value}`);
  console.log(`${line} => ${value}`);
  total += value;
}

console.log(total);
console.log('Done');
