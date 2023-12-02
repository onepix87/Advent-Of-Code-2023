const fs = require('fs');

const input = fs.readFileSync(__dirname + '/input', { encoding: "utf-8" });

const output = input.split('\n').reduce((sum, game) =>
    sum +
    (game.match(/\d+ red/g) || []).reduce((max, val) => max < parseInt(val, 10) ? parseInt(val, 10) : max, 0) *
    (game.match(/\d+ green/g) || []).reduce((max, val) => max < parseInt(val, 10) ? parseInt(val, 10) : max, 0) *
    (game.match(/\d+ blue/g) || []).reduce((max, val) => max < parseInt(val, 10) ? parseInt(val, 10) : max, 0)
, 0)

console.log(output);