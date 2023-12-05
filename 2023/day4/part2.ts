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
    const winningNumbers = lines.map((line) =>
        line
            .trim()
            .split(':')[1]
            .split('|')[0]
            .split(' ')
            .filter((chars) => chars !== '')
    );

    const myNumbers = lines.map((line) =>
        line
            .trim()
            .split(':')[1]
            .split('|')[1]
            .split(' ')
            .filter((chars) => chars !== '')
    );

    const copies: Record<number, number> = {};

    for (let [card_index, cardNumbers] of myNumbers.entries()) {
        let numofwinners = 0;

        for (let [number_index, number] of cardNumbers.entries()) {
            const isWinner = winningNumbers[card_index].includes(number);

            if (isWinner) {
                numofwinners += 1;
            }
        }

        copies[card_index] ? '' : (copies[card_index] = 0);

        for (let x = 0; x <= copies[card_index]; x++) {
            for (let i = 1; i <= numofwinners; i++) {
                copies[card_index + i] = copies[card_index + i] ? copies[card_index + i] + 1 : 1;
            }
        }
    }

    const result = Object.entries(copies).map(([key, value]) => {
        return value + 1;
    });

    const sum = result.reduce((a, b) => a + b);

    console.log(sum);
}
