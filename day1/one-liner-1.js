console.log(require('fs').readFileSync(__dirname + '/input', { encoding: "utf-8" }).split('\n').map(line => Array.from(line).map(val => ~~val).filter(val => val !== 0).filter((_, index, arr) => index === 0 || index === arr.length - 1).join('')).map(code => code.length < 2 ? code.repeat(2) : code).reduce((sum, val) => sum + ~~val, 0));