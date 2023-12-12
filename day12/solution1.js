const fs = require('fs');

const input = fs.readFileSync(__dirname + '/input', { encoding: "utf-8" });

const springs = input.split('\n').slice(0, -1).map(line => line.split(' ')).map(([sym, arr]) => [sym.split(''), arr.split(',').map(val => ~~val)]);

function springsCombinations(all, damaged, curr, i) {
    if (i < all.length && all[i] !== '?') {
        return springsCombinations(all, damaged, [...curr, all[i]], i + 1);
    }
    if (all[i] === '?') {
        let variant1 = springsCombinations(all, damaged, [...curr, '#'], i + 1);
        let variant2 = springsCombinations(all, damaged, [...curr, '.'], i + 1);
        if (variant1 && !variant2) return [...(Array.isArray(variant1[0]) ? variant1 : [variant1])];
        if (variant2 && !variant1) return [...(Array.isArray(variant2[0]) ? variant2 : [variant2])];
        if (variant1 && variant2) {
            return [...(Array.isArray(variant1[0]) ? variant1 : [variant1]), ...(Array.isArray(variant2[0]) ? variant2 : [variant2])];
        }
    }
    if (i === all.length) {
        let j = 0;

        let damagedCount = curr.reduce((acc, val, index) => {
            if (val === '#') acc[j] = (acc[j] ?? 0) + 1;
            if (val === '.' && curr[index - 1] === '#') j+=1;
            return acc;
        }, []);

        if (damagedCount.every((val, index) => val === damaged[index]) && damagedCount.length === damaged.length) return damagedCount;
    }
}

console.log(springs.reduce((sum, [all, damaged]) => sum + springsCombinations(all, damaged, [], 0).length, 0));