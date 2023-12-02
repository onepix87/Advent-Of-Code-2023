const fs = require('fs');

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

    return sum + ~~(first+last);
}, 0);

console.log(output);