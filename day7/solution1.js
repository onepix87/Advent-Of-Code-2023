const fs = require('fs');

function getHandType(hand) {
    return Object.values(Array.from(hand).reduce((acc, curr) => (acc[curr] = (acc[curr] ?? 0) + 1, acc), {})).reduce((type, occ) => {
        let outp = 1;

        if (occ === 5) outp = 7;

        if (occ === 4) outp = 6;

        if (occ === 3 && type === 2) outp = 5;
        if (occ === 3 && type !== 2) outp = 4;

        if (occ === 2 && type === 4) outp = 5;
        if (occ === 2 && type === 2) outp = 3;
        if (occ === 2 && (type === 1 || !type)) outp = 2;

        return Math.max(type, outp);
    }, 0);
}

const cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

const input = fs.readFileSync(__dirname + '/input', { encoding: "utf-8" });

console.log(input.split('\n').slice(0, -1).map(line => line.split(' ')).sort((h1, h2) => {
    let diff = getHandType(h1[0]) - getHandType(h2[0]);

    if (diff === 0) {
        for (let i = 0; i < h1[0].length; i++) {
            diff = cards.indexOf(h2[0][i]) - cards.indexOf(h1[0][i]);
            if (diff !== 0) break;
        }
    }

    return diff;
}).reduce((sum, hand, index) => sum + ~~hand[1] * (index + 1), 0));