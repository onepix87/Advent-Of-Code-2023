const fs = require('fs');

const input = fs.readFileSync(__dirname + '/input', { encoding: "utf-8" });

const turns = input.split('\n')[0];

const map = {};
input.split('\n').slice(2, -1).forEach(elem => {
    let [loc, dest] = elem.split(' = ');
    map[loc] = dest.match(/[A-Z]+[^(),]/g);
});

let currentLocation = 'AAA';
let i = 0;
let counter = 0;

while (currentLocation !== 'ZZZ') {
    currentLocation = turns[i] === 'L' ? map[currentLocation][0] : map[currentLocation][1];
    i = i === turns.length - 1 ? 0 : i + 1;
    counter += 1;
}

console.log(counter);