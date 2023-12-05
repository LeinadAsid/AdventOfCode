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

interface Sequence {
    numbers: string;
    ystartIndex: number;
    yendIndex: number;
    xIndex: number;
}

function solution(input: string[]) {
    const Arr2d = input.map((line) => line.trim().split(''));

    let currentSequence: Sequence = {
        numbers: '',
        ystartIndex: -1,
        yendIndex: -1,
        xIndex: -1,
    };

    let numbers: number[] = [];

    for (let x = 0; x < Arr2d.length; x++) {
        for (let y = 0; y < Arr2d[0].length; y++) {
            if (currentSequence.numbers !== '' && isNaN(Number(Arr2d[x][y]))) {
                if (isPart(currentSequence, Arr2d)) {
                    numbers.push(Number(currentSequence.numbers));
                }
                currentSequence.numbers = '';
                currentSequence.ystartIndex = -1;
                currentSequence.yendIndex = -1;
                currentSequence.xIndex = -1;
            }

            if (!isNaN(Number(Arr2d[x][y]))) {
                currentSequence.numbers += Arr2d[x][y];
                if (currentSequence.ystartIndex === -1) {
                    currentSequence.ystartIndex = y;
                }

                if (currentSequence.xIndex === -1) {
                    currentSequence.xIndex = x;
                }

                currentSequence.yendIndex = y;
            }
        }
    }

    const sum = numbers.reduce((a, b) => a + b);
    console.log(sum);
}

function isPart(sequence: Sequence, arr: string[][]): boolean {
    for (let _x = sequence.xIndex - 1; _x < sequence.xIndex + 2; _x++) {
        for (let _y = sequence.ystartIndex - 1; _y < sequence.yendIndex + 2; _y++) {
            if (!inBounds(_x, _y, arr.length, arr[0].length)) {
                continue;
            }

            const char = arr[_x][_y];

            if (isNaN(Number(char)) && char !== '.') {
                return true;
            }
        }
    }
    return false;
}

function inBounds(x: number, y: number, max_x: number, max_y: number) {
    return x >= 0 && y >= 0 && x < max_x && y < max_y;
}
