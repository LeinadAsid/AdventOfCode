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

    const listofpoints = myNumbers.map((cardNumbers, index) => {
        let totalPoints = 0;

        cardNumbers.map((number) => {
            if (winningNumbers[index].includes(number)) {
                if (totalPoints === 0) {
                    totalPoints += 1;
                } else {
                    totalPoints *= 2;
                }
            }
        });

        return totalPoints
    });

    const sumpoints = listofpoints.reduce((a, b) => a + b);

    console.log(sumpoints);
}
