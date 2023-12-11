const fs = require('fs');

const input = fs.readFileSync(__dirname + '/input', { encoding: "utf-8" });

const pipesMatrix = input.split('\n').slice(0, -1).map(line => line.split(''));

const [i, j] = pipesMatrix.reduce((acc, line, index) => {
    if (line.includes('S')) acc = [index, line.indexOf('S')];
    return acc;
}, []);

let currentPoints = [[i-1, j, pipesMatrix[i-1][j]], [i+1, j, pipesMatrix[i+1][j]]];
let counter = 1;

const prevPoints = [[i, j], [i, j]];

function nextPoint([row, column, type], [prevRow, prevColumn]) {
    let nextPoint;

    switch (type) {
        case '|':
            let nextRow = row + 1 === prevRow ? row - 1 : row + 1
            nextPoint = [nextRow, column, pipesMatrix[nextRow][column]]
            break;
        case '-':
            let nextColumn = column + 1 === prevColumn ? column - 1 : column + 1;
            nextPoint = [row, nextColumn, pipesMatrix[row][nextColumn]]
            break;
        case 'L':
            if (row - 1 === prevRow) nextPoint = [row, column + 1, pipesMatrix[row][column + 1]]
            else nextPoint = [row - 1, column, pipesMatrix[row - 1][column]]
            break;
        case 'J':
            if (row - 1 === prevRow) nextPoint = [row, column - 1, pipesMatrix[row][column - 1]]
            else nextPoint = [row - 1, column, pipesMatrix[row - 1][column]]
            break;
        case '7':
            if (row + 1 === prevRow) nextPoint = [row, column - 1, pipesMatrix[row][column - 1]]
            else nextPoint = [row + 1, column, pipesMatrix[row + 1][column]]
            break;
        case 'F':
            if (row + 1 === prevRow) nextPoint = [row, column + 1, pipesMatrix[row][column + 1]]
            else nextPoint = [row + 1, column, pipesMatrix[row + 1][column]]
            break;
    }

    return nextPoint;
}

while (!currentPoints[0].every((val, i) => val === currentPoints[1][i])) {
    currentPoints = currentPoints.map((point, index) => {
        let next = nextPoint(point, prevPoints[index]);
        prevPoints[index] = point;
        return next;
    });

    counter += 1;
}

console.log(counter);