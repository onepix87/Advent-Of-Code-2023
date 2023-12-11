const fs = require('fs');

const input = fs.readFileSync(__dirname + '/input', { encoding: "utf-8" });

const emptyRows = [];
const emptyColumns = [];
const galaxies = [];

const galaxyMatrix = input.split('\n').slice(0, -1).map(line => line.split(''));

galaxyMatrix.forEach(((row, index) => row.every(val => val === '.') && emptyRows.push(index)));

for (let i = 0; i < galaxyMatrix[0].length; i++) {
    let column = [];

    for (let j = 0; j < galaxyMatrix.length; j++) {
        column.push(galaxyMatrix[j][i]);
    }

    if (column.every(val => val === '.')) emptyColumns.push(i);
}

galaxyMatrix.forEach((row, index) => row.forEach((val, colIndex) => val === '#' && galaxies.push([colIndex, index])));

let distanceSum = 0;

for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
        distanceSum = distanceSum +
            emptyColumns.filter(val => (val > galaxies[j][0] && val < galaxies[i][0]) || (val < galaxies[j][0] && val > galaxies[i][0])).length + Math.abs(galaxies[i][0] - galaxies[j][0]) +
            emptyRows.filter(val => (val > galaxies[j][1] && val < galaxies[i][1]) || (val < galaxies[j][1] && val > galaxies[i][1])).length + Math.abs(galaxies[i][1] - galaxies[j][1]);
    }
}

console.log(distanceSum);