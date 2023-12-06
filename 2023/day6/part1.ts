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
    const times = lines[0].split(':')[1].split(' ').filter((x) => x !== '' && x !== ' ');
    const distances = lines[1].split(':')[1].split(' ').filter((x) => x !== '' && x !== ' ');

    
    const differentWays = times.map((time, index) => {
        const nTime = Number(time);
        const nDistance = Number(distances[index]);

        const ways: number[] = [];

        for (let i = 0; i <= nTime; i++) {
            const miles = i * (nTime - i);
            
            if (miles > nDistance) {
                ways.push(i);
            }
        }

        return ways.length;
    });

    const multiply = differentWays.flat().reduce((a, b) => a * b);

    console.log(multiply);
}