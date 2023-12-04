const fs = require('fs');

const input = fs.readFileSync(__dirname + '/input', { encoding: "utf-8" });

console.log(input.split('\n').reduce((sum, line) => {
    let [win, all] = line.split('|').map(val => val.split(' ').filter(num => !isNaN(num) && num !== ''));
    return sum + win.reduce((points, num) => all.includes(num) ? points === 0 ? 1 : points * 2 : points, 0)
}, 0));