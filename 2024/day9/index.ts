import { readFileSync } from 'fs';

type Item = { id: number; count: number };

const debug = (items: Item[]) => {
  const output = items
    .map(({ id, count }) => (id === -1 ? '.' : String(id)).repeat(count))
    .join('');
  console.log(output);
};

const advent = readFileSync('./test2.txt', 'utf8').trim().split('').map(Number);

let id = 0;
const files: Item[] = [];

for (let i = 0; i < advent.length; i += 2) {
  const blocks = advent[i];
  if (blocks === undefined) {
    break;
  }
  files.push({ id, count: blocks });
  const spaces = advent[i + 1] ?? 0;
  if (spaces) {
    files.push({ id: -1, count: spaces });
  }

  id++;
}

// debug(files);

const part1 = () => {
  const outputs: Item[] = [];

  while (true) {
    // debug([...outputs, ...files]);

    const start = files.shift();
    if (!start) {
      break;
    }

    if (start.id !== -1) {
      // console.log(`  Adding ${start.id}x${start.count} to output`);
      outputs.push(start);
      continue;
    }

    const end = files.pop();
    if (!end) {
      break;
    }

    if (end.id === -1) {
      if (start.count > 0) {
        files.unshift(start);
      }
      continue;
    }
    const current: Item = { id: end.id, count: Math.min(start.count, end.count) };

    start.count -= current.count;
    end.count -= current.count;

    outputs.push(current);

    // console.log(`  Moved ${current.id}x${current.count}`);

    if (start.count > 0) {
      files.unshift(start);
    }

    if (end.count > 0) {
      files.push(end);
    }
  }

  let total = 0;
  let i = 0;
  for (const output of outputs) {
    for (let j = 0; j < output.count; j++) {
      total += i * output.id;
      i++;
    }
  }

  console.log({ total });
};

const part2 = () => {
  const outputs: Item[] = [...files];
  const trailing: Item[] = [];

  for (const last of files.reverse()) {
    if (last.id === -1) {
      continue;
    }

    debug(outputs);

    for (const [i, file] of outputs.entries()) {
      if (file.id !== -1 || file.count < last.count) {
        continue;
      }

      outputs.splice(outputs.indexOf(last), 1);
      outputs.splice(i, 0, last);

      file.count -= last.count;
      break;
    }
  }

  debug(outputs);
};

part2();
