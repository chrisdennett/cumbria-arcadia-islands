// Write Javascript code!
const appDiv = document.getElementById('app');

const canvas = document.getElementById('artCanvas');

canvas.width = 400;
canvas.height = 400;

const ctx = canvas.getContext("2d");

const cellSize = 40;
const cols = Math.floor(canvas.width / cellSize);
const rows = Math.floor(canvas.height / cellSize);

for(let r = 0; r<rows; r++){
    for(let c = 0; c<rows; c++){
        const cellX = r*cellSize;
        const cellY = c*cellSize;
        ctx.strokeRect(cellX,cellY,cellSize, cellSize);
    }
}
