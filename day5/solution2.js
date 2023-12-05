const fs = require('fs');

const input = fs.readFileSync(__dirname + '/input', { encoding: "utf-8" });

const seeds = input.match(/(seeds: [^\n]+)/g)[0].match(/\d+ \d+/g).map(line => line.split(' ').map(seed => parseInt(seed, 10)));
const globalMap = input.split('\n').slice(2).reduce((acc, line) => {
    line !== '' ? acc[acc.length - 1].push(line) : acc.push([]);
    return acc;
}, [[]]).slice(0, -1).map(mapping => mapping.filter(line => !line.includes('map:')).map(line => line.split(' ').map(num => parseInt(num, 10))));

console.log(seeds.map(([seed, range]) => {
   let output = [[seed, range]];
   let stack = [];

   for (let i = 0; i < globalMap.length; i++) {
       stack = [...output];
       output = [];

       while (stack.length > 0) {
           let [currSeed, currRange] = stack.shift();
           let intersection = false;

           for (let j = 0; j < globalMap[i].length; j++) {
               let [dest, src, mapRange] = globalMap[i][j];
               if (currSeed >= src + mapRange || currSeed + currRange <= src) {
                   continue;
               }

               intersection = true;

               if (currSeed < src) {
                   output.push([dest, currSeed + currRange >= src + mapRange ? mapRange : currSeed + currRange - src]);
                   stack.push([currSeed, src - currSeed]);
                   if (currSeed + currRange > src + mapRange) stack.push([src + mapRange, currSeed + currRange - (src + mapRange)]);
               } else {
                   output.push([dest + currSeed - src, currSeed + currRange >= src + mapRange ? src + mapRange - currSeed : currRange]);
                   if (currSeed + currRange > src + mapRange) stack.push([src + mapRange, currSeed + currRange - (src + mapRange)]);
               }

               break;
           }

           if (!intersection) output.push([currSeed, currRange]);
       }
   }

   return output;
}).map(loc => loc.reduce((min, currLoc) => min[0] < currLoc[0] ? min : currLoc)).reduce((min, currLoc) => min[0] < currLoc[0] ? min : currLoc)[0]);