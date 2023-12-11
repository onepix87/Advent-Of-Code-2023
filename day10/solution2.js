const fs = require('fs');

const input = fs.readFileSync(__dirname + '/input', { encoding: "utf-8" });

const pipesMatrix = input.split('\n').slice(0, -1).map(line => line.split(''));

const [i, j] = pipesMatrix.reduce((acc, line, index) => {
    if (line.includes('S')) acc = [index, line.indexOf('S')];
    return acc;
}, []);

pipesMatrix[i][j] = 'V';

let currentPoints = [[i-1, j, pipesMatrix[i-1][j]], [i+1, j, pipesMatrix[i+1][j]]];

const prevPoints = [[i, j], [i, j]];

function nextPoint([row, column, type], [prevRow, prevColumn]) {
    let nextPoint;

    switch (type) {
        case '|':
            let nextRow = row + 1 === prevRow ? row - 1 : row + 1;
            nextPoint = [nextRow, column, pipesMatrix[nextRow][column]];
            pipesMatrix[row][column] = 'V';
            break;
        case '-':
            let nextColumn = column + 1 === prevColumn ? column - 1 : column + 1;
            nextPoint = [row, nextColumn, pipesMatrix[row][nextColumn]];
            pipesMatrix[row][column] = 'H';
            break;
        case 'L':
            if (row - 1 === prevRow) nextPoint = [row, column + 1, pipesMatrix[row][column + 1]]
            else nextPoint = [row - 1, column, pipesMatrix[row - 1][column]];
            pipesMatrix[row][column] = 'U';
            break;
        case 'J':
            if (row - 1 === prevRow) nextPoint = [row, column - 1, pipesMatrix[row][column - 1]]
            else nextPoint = [row - 1, column, pipesMatrix[row - 1][column]];
            pipesMatrix[row][column] = 'U';
            break;
        case '7':
            if (row + 1 === prevRow) nextPoint = [row, column - 1, pipesMatrix[row][column - 1]]
            else nextPoint = [row + 1, column, pipesMatrix[row + 1][column]];
            pipesMatrix[row][column] = 'D';
            break;
        case 'F':
            if (row + 1 === prevRow) nextPoint = [row, column + 1, pipesMatrix[row][column + 1]]
            else nextPoint = [row + 1, column, pipesMatrix[row + 1][column]];
            pipesMatrix[row][column] = 'D';
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
}

pipesMatrix[currentPoints[0][0]][currentPoints[0][1]] = 'U';

console.log(pipesMatrix.reduce((sum, row) => {
    let loopCounter = 0;
    let pipeCounter = 0;

    let filteredRow = row.filter(val => val !== 'H');
    let replacedRow = [];

    for (let i = 0; i < filteredRow.length; i += 1) {
        if (filteredRow[i] === 'U') {
            if (filteredRow[i + 1] === 'D') {
                replacedRow.push('V');
                i += 1;
                continue;
            }
            if (filteredRow[i + 1] === 'U') {
                replacedRow.push('R');
                i += 1;
                continue;
            }
        }

        if (filteredRow[i] === 'D') {
            if (filteredRow[i + 1] === 'U') {
                replacedRow.push('V');
                i += 1;
                continue;
            }
            if (filteredRow[i + 1] === 'D') {
                replacedRow.push('R');
                i += 1;
                continue;
            }
        }

        replacedRow.push(filteredRow[i]);
    }

    for (let i = 0; i < replacedRow.length; i += 1) {
        if (replacedRow[i] === 'V') {
            loopCounter += 1;
            continue;
        }
        if (loopCounter % 2 !== 0 && replacedRow[i] !== 'V' && replacedRow[i] !== 'U' && replacedRow[i] !== 'D' && replacedRow[i] !== 'R') {
            pipeCounter += 1;
        }
    }

    return pipeCounter + sum;
}, 0))