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

    for (let line of lines) {
        
        let numbers = [];

        for (let char of line) {
            if (!isNaN(Number(char))) {
                numbers.push(Number(char));
            }
        }
        
        sum += Number((String(numbers[0]) + String(numbers[numbers.length - 1])));
    }

    console.log(`\nResultado da soma é: ${sum}`);
});



