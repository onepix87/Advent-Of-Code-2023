const fs = require('fs');

const digits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
const input = fs.readFileSync(__dirname + '/input', { encoding: "utf-8" });

const output = input.split('\n').reduce((sum, line) => {
    let first;
    let last;

    for (let i = 0; i < line.length; i++) {
        if (!isNaN(line[i])) {
            if (!first) first = line[i];
            last = line[i];
        }
    }

    digits.forEach(val => {
        if (line.includes(val)) {
            if (line.indexOf(val) < line.indexOf(first)) first = val;
            if (line.lastIndexOf(val) > line.lastIndexOf(last)) last = val;
        }
    })

    first = digits.includes(first) ? '' + (digits.indexOf(first) + 1) : first;
    last = digits.includes(last) ? '' + (digits.indexOf(last) + 1) : last;

    return sum + ~~(first+last);
}, 0);

console.log(output);