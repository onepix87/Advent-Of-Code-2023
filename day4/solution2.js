const fs = require('fs');

const input = fs.readFileSync(__dirname + '/input', { encoding: "utf-8" });

const output = input.split('\n').slice(0, -1).reduce((arr, line, index) => {
    let [win, all] = line.split('|').map(val => val.split(' ').filter(num => !isNaN(num) && num !== ''));
    let extraCards = win.reduce((sum, num) => all.includes(num) ? sum + 1 : sum, 0);

    for (let i = index + 1; i < extraCards + index + 1; i++) {
        arr[i] = (arr[i] ?? 1) + (arr[index] ?? 1)
    }

    return arr;
}, []);

console.log(input.split('\n').slice(0, -1).reduce((sum, _, index) => sum + (output[index] ?? 1), 0));