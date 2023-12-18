import { readFileSync } from 'fs';
import * as _ from 'lodash';

enum Rank {
  HIGH_CARD = 0,
  ONE_PAIR = 1,
  TWO_PAIR = 2,
  THREE_OF_A_KIND = 3,
  FULL_HOUSE = 4,
  FOUR_OF_A_KIND = 5,
  FIVE_OF_A_KIND = 6,
}

const getType = (hand: string) => {
  const groups: Record<string, number> = {};
  for (const char of hand) {
    if (!groups[char]) {
      groups[char] = 0;
    }

    groups[char]++;
  }

  const J = groups.J;

  switch (Object.values(groups).length) {
    case 5:
      // high card
      if (J === 1) {
        return Rank.ONE_PAIR;
      }
      return Rank.HIGH_CARD;

    case 4:
      // 1 pair
      if (J === 1 || J === 2) {
        return Rank.THREE_OF_A_KIND;
      }
      return Rank.ONE_PAIR;

    case 3:
      // 3 of a kind
      if (Object.values(groups).find((count) => count === 3)) {
        if (J === 1 || J === 3) {
          return Rank.FOUR_OF_A_KIND;
        }

        return Rank.THREE_OF_A_KIND;
      }

      // 2 pair
      if (J === 1) {
        return Rank.FULL_HOUSE;
      }

      if (J === 2) {
        return Rank.FOUR_OF_A_KIND;
      }

      return Rank.TWO_PAIR;

    case 2:
      // 4 of a kind
      if (Object.values(groups).find((count) => count === 4)) {
        if (J === 1 || J === 4) {
          return Rank.FIVE_OF_A_KIND;
        }

        return Rank.FOUR_OF_A_KIND;
      }

      // full house
      if (J === 2 || J === 3) {
        return Rank.FIVE_OF_A_KIND;
      }

      return Rank.FULL_HOUSE;

    // 5 of a kind
    case 1:
      return Rank.FIVE_OF_A_KIND;
  }
};

const filename = 'input.txt';
const _hands = readFileSync(filename, 'utf8').trim().split('\n');
const hands = _.orderBy(
  _hands
    .map((hand) => hand.split(' '))
    .map(([hand, bid]) => {
      return {
        hand,
        bid: Number(bid),
        rank: getType(hand),
        cards: hand.split('').map((card) => {
          switch (card) {
            case 'A':
              return 14;
            case 'K':
              return 13;
            case 'Q':
              return 12;
            case 'J':
              return 1;
            case 'T':
              return 10;
            default:
              return Number(card);
          }
        }),
      };
    }),
  ['rank', 'cards[0]', 'cards[1]', 'cards[2]', 'cards[3]', 'cards[4]'],
  ['asc', 'asc', 'asc', 'asc', 'asc', 'asc']
);

console.log(hands);

let score = 0;
for (let i = 0; i < hands.length; i++) {
  const hand = hands[i];
  score += hand.bid * (i + 1);
}

console.dir(score);
