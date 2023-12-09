const fs = require('fs');

const input = fs.readFileSync(__dirname + '/input', { encoding: "utf-8" });

console.log(input.split('\n').slice(0, -1).reduce((sum, line) => {
    let firstValues = [];
    let currentSeq = line.split(' ').map(val => ~~val);

    while (!currentSeq.every(val => val === 0)) {
        firstValues.push(currentSeq[0]);
        let tempSeq = [];
        for (let i = 0; i < currentSeq.length-1; i++) {
            tempSeq.push(currentSeq[i + 1] - currentSeq[i]);
        }
        currentSeq = tempSeq;
    }

    return sum + firstValues.reduceRight((acc, val) => val - acc);
}, 0));