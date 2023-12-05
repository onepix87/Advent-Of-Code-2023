const fs = require('fs');

const input = fs.readFileSync(__dirname + '/input', { encoding: "utf-8" });

const seeds = input.match(/(seeds: [^\n]+)/g)[0].split(' ').slice(1).map(seed => parseInt(seed, 10));
const globalMap = input.split('\n').slice(2).reduce((acc, line) => {
    line !== '' ? acc[acc.length - 1].push(line) : acc.push([]);
    return acc;
}, [[]]).slice(0, -1).map(mapping => mapping.filter(line => !line.includes('map:')).map(line => line.split(' ').map(num => parseInt(num, 10))));

console.log(seeds.map(seed => {
    let output = seed;

    for (let i = 0; i < globalMap.length; i++) {
        for (let j = 0; j < globalMap[i].length; j++) {
            let [dest, src, range] = globalMap[i][j];
            if (output >= src && output <= src + range) {
                output = dest + output - src;
                break;
            }
        }
    }

    return output;
}).reduce((min, num) => Math.min(min, num)));