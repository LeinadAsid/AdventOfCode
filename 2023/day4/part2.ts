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

    for (let cardNumbers of myNumbers) {
        
    }
}
