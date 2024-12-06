import { readFileSync } from 'fs';

const [ruleLines, updateLines] = readFileSync('./input.txt', 'utf8').trim().split('\n\n');
const rules = ruleLines.split('\n').map((item) => item.trim().split('|').map(Number));
const updates = updateLines.split('\n').map((item) => item.trim().split(',').map(Number));

const beforeMap: Record<number, number[]> = {};
for (const [first, second] of rules) {
  if (!beforeMap[first]) {
    beforeMap[first] = [];
  }

  // first number has to be before second number in an update
  beforeMap[first].push(second);
}

const check = (pages: number[]) => {
  const invalid: number[] = [];
  const valid: number[] = [];
  const seen = new Set<number>();

  for (const page of pages) {
    const beforePages = beforeMap[page] ?? [];
    let skipped = false;
    for (const rulePage of beforePages) {
      if (seen.has(rulePage)) {
        skipped = true;
        break;
      }
    }

    seen.add(page);

    (skipped ? invalid : valid).push(page);
  }

  return { valid, invalid };
};

const isValid = (pages: number[]): boolean => check(pages).invalid.length === 0;

const fix = (pages: number[]): number[] => {
  const { valid, invalid } = check(pages);
  let update: number[] = [...valid];

  // console.log(`[${pages}] => [${valid}], [${invalid}]`);
  // console.log(`  [${valid}]`);

  for (const invalidPage of invalid) {
    let minIndex = Math.max(update.length - 1, 0);
    const beforePages = beforeMap[invalidPage] ?? [];
    for (const rulePage of beforePages) {
      const index = update.indexOf(rulePage);
      if (index !== -1 && index < minIndex) {
        minIndex = index;
      }
    }

    update.splice(minIndex, 0, invalidPage);
    // console.log(`  [${update}] (+${invalidPage})`);
  }

  return update;
};

const getMiddle = (update: number[]): number => update[(update.length + 1) / 2 - 1];

const part1 = () => {
  let total = 0;

  for (const update of updates) {
    if (isValid(update)) {
      total += getMiddle(update);
    }
  }

  console.log({ total });
};

const part2 = () => {
  let total = 0;

  for (const update of updates) {
    if (isValid(update)) {
      continue;
    }

    total += getMiddle(fix(update));
  }

  console.log({ total });
};

part2();
