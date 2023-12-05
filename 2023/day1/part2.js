#!/usr/bin/env node

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

const lines = [];

rl.on('line', (line) => {
    lines.push(line);
});

rl.on('close', () => {
    let sum = 0;
    let lineNumbers = [];

    let stringNumbers = {
        one: '1',
        two: '2',
        three: '3',
        four: '4',
        five: '5',
        six: '6',
        seven: '7',
        eight: '8',
        nine: '9',
    };

    let arrayOfStringNumbers = Object.keys(stringNumbers);

    for (let line of lines) {
        let numbers = [];

        for (let strNum of arrayOfStringNumbers) {
            let matches = [...line.matchAll(strNum)];

            matches.forEach((match) => {
                numbers.push({ value: Number(stringNumbers[strNum]), index: match.index });
            });
        }

        for (let i = 0; i < line.length; i++) {
            if (!isNaN(Number(line[i]))) {
                numbers.push({ value: Number(line[i]), index: i });
            }
        }

        numbers.sort((a, b) => a.index - b.index);

        let join;
        join = Number(String(numbers[0].value) + String(numbers[numbers.length - 1].value));

        sum += join;

        lineNumbers.push(join);
    }


    console.log(sum);
});
