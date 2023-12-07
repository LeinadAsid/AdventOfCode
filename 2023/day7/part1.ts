#!/usr/bin/env ts-node
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
});

const lines: string[] = [];

rl.on('line', (line: string) => {
    lines.push(line);
});

rl.on('close', () => {
    return solution(lines);
});

function solution(lines: string[]) {
    const handsBids = lines.map((line) => line.split(' '));

    handsBids.sort((a, b) => sortingFunction(a[0], b[0]));

    const bidSum = handsBids.reduce((acc, handBid, idx) => {
        return (acc += Number(handBid[1]) * (idx + 1));
    }, 0);

    console.log(handsBids);
    console.log(bidSum);
}

function sortingFunction(a: string, b: string): number {
    let sortingNumber = 0;
    const handAInfo = getHandInfo(a);
    const handBInfo = getHandInfo(b);
    const charStrength = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'].reverse();

    const max_numberA = Math.max(...Object.values(handAInfo));
    const max_numberB = Math.max(...Object.values(handBInfo));

    sortingNumber = max_numberA - max_numberB;

    if (sortingNumber === 0 && max_numberA === 2) {
        const isTwoPairA = Object.values(handAInfo).filter((x) => x === 2).length === 2;
        const isTwoPairB = Object.values(handBInfo).filter((x) => x === 2).length === 2;

        if (isTwoPairA && !isTwoPairB) {
            sortingNumber =  1;
        } else if (isTwoPairB && !isTwoPairA) {
            sortingNumber = -1;
        }
    }

    if (sortingNumber !== 0) {
        return sortingNumber;
    }

    const isFullHouseA = Object.values(handAInfo).includes(3) && Object.values(handAInfo).includes(2);
    const isFullHouseB = Object.values(handBInfo).includes(3) && Object.values(handBInfo).includes(2);

    if (isFullHouseA && !isFullHouseB) {
        sortingNumber =  1;
    } else if (isFullHouseB && !isFullHouseA) {
        sortingNumber = -1;
    }

    if (sortingNumber !== 0) {
        return sortingNumber;
    }

    for (let i = 0; i < 5; i++) {
        const charStrengthIndexA = charStrength.findIndex((x) => x === a[i]);
        const charStrengthIndexB = charStrength.findIndex((x) => x === b[i]);

        if (charStrengthIndexA !== charStrengthIndexB) {
            sortingNumber = charStrengthIndexA - charStrengthIndexB;
            break;
        }
    }

    return sortingNumber;
}

function getHandInfo(hand: string): Record<string, number> {
    const nChar: Record<string, number> = {};

    for (let ch of hand) {
        nChar[ch] ? (nChar[ch] += 1) : (nChar[ch] = 1);
    }

    return nChar;
}
