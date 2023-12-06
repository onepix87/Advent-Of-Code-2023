const fs = require('fs');

const input = fs.readFileSync(__dirname + '/input', { encoding: "utf-8" });
const [time, dist] = input.split('\n').map(line => line.match(/\d+/g)?.map(num => ~~num));

console.log(time.reduce((totalWays, time, index) => {
    let currWays = 0;
    for (let i = 1; i <= time; i++) {
        if (i * (time-i) > dist[index]) currWays +=1;
    }
    return totalWays * currWays;
}, 1));