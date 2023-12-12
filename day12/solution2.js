const fs = require('fs');

const input = fs.readFileSync(__dirname + '/input', { encoding: "utf-8" });

const springs = input.split('\n').slice(0, -1)
    .map(line => line.split(' '))
    .map(([sym, arr]) => [`${sym}?`.repeat(5).slice(0, -1), `${arr},`.repeat(5).slice(0, -1).split(',').map(val => ~~val)]);

function springsCombinations(springString, damagedStack, group = 0, cache) {
    if (!springString) {
        return damagedStack.length === 0 && group === 0;
    }
    let combs = 0;
    let curr = [springString[0]];

    if (curr[0] === '?') {
        curr = ['.', '#'];
    }

    curr.forEach(val => {
        if (val === '#') {
            combs += springsCombinations(springString.slice(1), damagedStack, group + 1, cache);
        } else {
            if (group !== 0) {
                if (damagedStack[0] === group) {
                    if (cache.has(`${springString.slice(1)}${damagedStack.slice(1)}`)) {
                        combs += cache.get(`${springString.slice(1)}${damagedStack.slice(1)}`);
                    } else {
                        let result = springsCombinations(springString.slice(1), damagedStack.slice(1), 0, cache);
                        combs += result;
                        cache.set(`${springString.slice(1)}${damagedStack.slice(1)}`, result);
                    }
                }
            } else {
                if (cache.has(`${springString.slice(1)}${damagedStack}`)) {
                    combs += cache.get(`${springString.slice(1)}${damagedStack}`);
                } else {
                    let result = springsCombinations(springString.slice(1), damagedStack, 0, cache);
                    combs += result;
                    cache.set(`${springString.slice(1)}${damagedStack}`, result);
                }
            }
        }
    })

    return combs;
}

console.log(springs.reduce((sum, [str, stack]) => sum + springsCombinations(`${str}.`, stack, 0, new Map()), 0));