const fs = require('fs');

const input = fs.readFileSync(__dirname + '/input', { encoding: "utf-8" });

console.log(input.split('\n').slice(0, -1).reduce((sum, line) => {
    let lastValues = [];
    let currentSeq = line.split(' ').map(val => ~~val);

    while (!currentSeq.every(val => val === 0)) {
        lastValues.push(currentSeq[currentSeq.length - 1]);
        let tempSeq = [];
        for (let i = 0; i < currentSeq.length-1; i++) {
            tempSeq.push(currentSeq[i + 1] - currentSeq[i]);
        }
        currentSeq = tempSeq;
    }

    return sum + lastValues.reduceRight((acc, val) => acc + val);
}, 0));