const fs = require('fs');

const input = fs.readFileSync(__dirname + '/input', { encoding: "utf-8" });

const engine = [];

Array.from(input).reduce((res, val, index) => {
    if (!isNaN(val) && val !== '\n') {
        if (res !== '' && isNaN(res)) {
            engine.push([res, index - res.length]);
            res = '';
        }
        res += val;
    }
    if (res !== '' && (val === '.' || val === '\n')) {
        engine.push([res, index - res.length]);
        res = '';
    }
    if (isNaN(val) && val !== '.') {
        if (res !== '') engine.push([res, index - res.length]);
        if (val === '*') res = val;
    }

    return res;
}, '');

console.log(engine.reduce((acc, val, _, eng) => {
    if (isNaN(val[0])) {
        let adjNums = eng.filter(num => {
            return !isNaN(num[0]) &&
                Math.abs(Math.floor(val[1]/141) - Math.floor(num[1]/141)) <= 1 &&
                ((num[1]%141 - val[1]%141 <= 1 && num[1]%141 - val[1]%141 >= 0) || (val[1]%141 - num[1]%141 <= num[0].length && val[1]%141 - num[1]%141 >= 0))
        });

        if (adjNums.length === 2) acc += ~~adjNums[0][0] * ~~adjNums[1][0]
    }

    return acc;
}, 0));