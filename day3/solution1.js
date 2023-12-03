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
        res = val;
    }

    return res;
}, '');

console.log(engine.filter((val, _, eng) => {
    if (!isNaN(val[0])) {
        return eng.filter(sym => {
            return isNaN(sym[0]) &&
                Math.abs(Math.floor(val[1]/141) - Math.floor(sym[1]/141)) <= 1 &&
                ((val[1]%141 - sym[1]%141 <= 1 && val[1]%141 - sym[1]%141 >= 0) || (sym[1]%141 - val[1]%141 <= val[0].length && sym[1]%141 - val[1]%141 >= 0))
        }).length > 0
    }
    return true;
}).reduce((sum, val) => sum + ~~val[0], 0));