import { readFileSync } from 'fs';

const lines = readFileSync('./input.txt', 'utf8').trim().split('\n');

const reports: number[][] = [];
for (const line of lines) {
  reports.push(line.split(/\s+/).map(Number));
}

const isValid = (report: number[]) => {
  let direction: 'ascending' | 'descending' | 'unknown' = 'unknown';
  let previous = report[0];
  for (const item of report.slice(1)) {
    if (item === previous) {
      return false;
    }

    if (direction === 'unknown') {
      direction = item > previous ? 'ascending' : 'descending';
    }

    const delta = (item - previous) * (direction === 'ascending' ? 1 : -1);

    if (delta < 1 || delta > 3) {
      return false;
    }

    previous = item;
  }

  return true;
};

const isValidWithDampener = (report: number[]) => {
  if (isValid(report)) {
    return true;
  }

  for (let i = 0; i < report.length; i++) {
    if (isValid([...report.slice(0, i), ...report.slice(i + 1)])) {
      return true;
    }
  }

  return false;
};

let count = 0;
for (const report of reports) {
  if (isValidWithDampener(report)) {
    count++;
  }
}

console.log({ count });
