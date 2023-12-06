const fs = require('fs');

const input = fs.readFileSync(__dirname + '/input', { encoding: "utf-8" });
const [time, dist] = input.split('\n').map(line => line.match(/\d+/g)?.join('')).map(num => parseInt(num, 10));

const minSpeed = Math.ceil((time - Math.sqrt(Math.pow(time, 2) - 4*dist))/2);
const maxSpeed = Math.floor((time + Math.sqrt(Math.pow(time, 2) - 4*dist))/2);

console.log(maxSpeed - minSpeed + 1);