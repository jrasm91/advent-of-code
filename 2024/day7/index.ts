import { readFileSync } from 'fs';

const input = readFileSync('./input.txt', 'utf8').trim();
const lines = input.split('\n');

const isValid = ({ target, parts }: { target: number; parts: number[] }): boolean => {
  let [current, ...currentParts] = parts;

  if (currentParts.length === 0) {
    return target === current;
  }

  const divideTarget = target / current;
  const subtractTarget = target - current;
  const replaceTarget = Number(String(target).slice(0, -String(current).length));

  const result =
    (divideTarget % 1 === 0 && isValid({ target: divideTarget, parts: currentParts })) ||
    (subtractTarget >= 0 && isValid({ target: subtractTarget, parts: currentParts })) ||
    (String(target).endsWith(String(current)) &&
      isValid({ target: replaceTarget, parts: currentParts }));

  return result;
};

let total = 0;
for (const line of lines) {
  const [target, ...parts] = line.replace(':', '').split(' ').map(Number);
  if (isValid({ target, parts: parts.reverse() })) {
    total += target;
  }
}

console.log({ total });
