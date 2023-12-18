import { readFileSync } from 'fs';

const filename = 'input.txt';
const [_times, _distances] = readFileSync(filename, 'utf8').trim().split('\n');
const times = _times.replace('Time: ', '').replace(/ +/g, '').trim().split(' ').map(Number);
const distances = _distances
  .replace('Distance: ', '')
  .replace(/ +/g, '')
  .trim()
  .split(' ')
  .map(Number);

let answer = 1;
for (let i = 0; i < times.length; i++) {
  const time = times[i];
  const distance = distances[i];

  console.log({ time, distance });

  let count = 0;
  for (let j = 0; j < time; j++) {
    const value = (time - j) * j;
    if (value > distance) {
      count++;
    }
  }

  answer *= count;

  console.log(`Options: ${count}`);
}

console.log('Answer', answer);
console.log('Done');
