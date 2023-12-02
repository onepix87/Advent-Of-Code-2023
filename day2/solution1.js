const fs = require('fs');

const input = fs.readFileSync(__dirname + '/input', { encoding: "utf-8" });

const output = input.split('\n').filter(game =>
    (game.match(/\d+ red/g) || []).reduce((possible, val) => possible && parseInt(val, 10) <= 12, true) &&
    (game.match(/\d+ green/g) || []).reduce((possible, val) => possible && parseInt(val, 10) <= 13, true) &&
    (game.match(/\d+ blue/g) || []).reduce((possible, val) => possible && parseInt(val, 10) <= 14, true)
).filter(game => game !== '').reduce((sum, game) => sum + ~~(game.match(/Game (\d+)/g)[0].replace('Game ', '')), 0)

console.log(output);