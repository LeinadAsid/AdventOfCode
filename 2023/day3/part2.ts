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

interface NumberResult {
    number: number;
    xindex: number;
    yindex: number;
    length: number;
}

function solution(input: string[]) {
    const Arr2d = input.map((line) => line.trim().split(''));

    let currentSequence: Sequence = {
        numbers: '',
        ystartIndex: -1,
        yendIndex: -1,
        xIndex: -1,
    };

    let numbers: NumberResult[] = [];

    let gears: NumberResult[][] = [];

    for (let x = 0; x < Arr2d.length; x++) {
        for (let y = 0; y < Arr2d[0].length; y++) {

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

            const nextDigit = Arr2d[x][y + 1];

            if (currentSequence.numbers !== '' && (isNaN(Number(Arr2d[x][y])) || !nextDigit)) {
                if (isPart(currentSequence, Arr2d)) {
                    numbers.push({
                        number: Number(currentSequence.numbers),
                        xindex: x,
                        length: currentSequence.numbers.length,
                        yindex: y,
                    });
                }
                currentSequence.numbers = '';
                currentSequence.ystartIndex = -1;
                currentSequence.yendIndex = -1;
                currentSequence.xIndex = -1;
            }

            
        }
    }

    console.log(numbers);

    for (let x = 0; x < Arr2d.length; x++) {
        for (let y = 0; y < Arr2d[0].length; y++) {
            if (Arr2d[x][y] === '*') {
                const gearRatios = numbers.filter((num) => {
                    if (isInRange(y, num.yindex - num.length - 1, num.yindex) && isInRange(num.xindex, x - 1, x + 1)) {
                        return true;
                    }
                });

                if (gearRatios.length === 2) {
                    gears.push(gearRatios);
                }
            }
        }
    }

    const ratios = gears.map((nums) => nums.map((num) => num.number)).flatMap((a) => a[0] * a[1]);

    const gearsSum = ratios.reduce((a, b) => a + b);
    const sum = numbers.reduce((a, b) => (a += b.number), 0);
    console.log(`part1: ${sum}`);
    console.log(`part2: ${gearsSum}`);
}

function isInRange(number: number, min: number, max: number) {
    return number >= min && number <= max;
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
