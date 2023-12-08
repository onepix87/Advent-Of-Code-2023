const fs = require('fs');

const input = fs.readFileSync(__dirname + '/input', { encoding: "utf-8" });

const turns = input.split('\n')[0];

const map = {};
input.split('\n').slice(2, -1).forEach(elem => {
    let [loc, dest] = elem.split(' = ');
    map[loc] = dest.match(/[A-Z]+[^(),]/g);
});

let currentLocations = Object.keys(map).filter(key => key[2] === 'A');

const gcd = (a, b) => a ? gcd(b % a, a) : b;

const lcm = (a, b) => a * b / gcd(a, b);

console.log(currentLocations.map(loc => {
    let currentLocation = loc;
    let i = 0;
    let counter = 0;

    while (currentLocation[2] !== 'Z') {
        currentLocation = turns[i] === 'L' ? map[currentLocation][0] : map[currentLocation][1];
        i = i === turns.length - 1 ? 0 : i + 1;
        counter += 1;
    }

    return counter;
}).reduce(lcm));