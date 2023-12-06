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
    const time = lines[0]
        .split(':')[1]
        .split(' ')
        .filter((x) => x !== '' && x !== ' ')
        .join('');
    const distance = lines[1]
        .split(':')[1]
        .split(' ')
        .filter((x) => x !== '' && x !== ' ')
        .join('');

    console.log(time);
    console.log(distance);

    const nTime = Number(time);
    const nDistance = Number(distance);

    const ways: number[] = [];

    for (let i = 0; i <= nTime; i++) {
        const miles = i * (nTime - i);

        if (miles > nDistance) {
            ways.push(i);
        }
    }

    console.log(ways.length);
}
