import { readFileSync } from 'fs';

let total = 0;
let power = 0;
const lines = readFileSync('./input.txt', 'utf8').trim().split('\n');
for (const line of lines) {
  let valid = true;
  const parts = line.split(': ');
  const max = { red: 0, green: 0, blue: 0 };
  for (const part of parts[1].split(';')) {
    const round = {
      red: Number(part.match(/(\d+) red/)?.[1] || 0),
      green: Number(part.match(/(\d+) green/)?.[1] || 0),
      blue: Number(part.match(/(\d+) blue/)?.[1] || 0),
    };

    if (round.red > 12 || round.green > 13 || round.blue > 14) {
      valid = false;
    }

    max.red = Math.max(max.red, round.red);
    max.green = Math.max(max.green, round.green);
    max.blue = Math.max(max.blue, round.blue);
  }

  if (valid) {
    console.log('Adding', line);
    const id = Number(parts[0].replace('Game ', ''));
    total += id;
  }

  power += max.red * max.green * max.blue;
}

console.log(`Total=${total}, Power=${power}`);
console.log('Done');
