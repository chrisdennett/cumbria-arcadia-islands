import { loadImage } from "./utils/loadImage.js";

// Write Javascript code!
const appDiv = document.getElementById('app');

const canvas = document.getElementById('artCanvas');

const waterTile = await loadImage("/assets/water.png");
const landTile = await loadImage("/assets/land.png");

const cellSize = 32;
const cellsAcross = 10;
const cellsDown = 10;

canvas.width = cellsAcross * cellSize;
canvas.height = cellsDown * cellSize;

const ctx = canvas.getContext("2d");

const halfOffset = cellSize / 2;
const sunkenOffset = 6;
const altRowVOffset = 8;

const tileMap = [];
tileMap.push([0,1,1,1,1,1,1,1,0,0]);
tileMap.push([0,1,1,1,2,2,1,1,0,0]);
tileMap.push([0,0,1,1,2,2,1,1,0,0]);
tileMap.push([0,1,1,1,2,2,1,1,0,0]);
tileMap.push([1,0,1,1,2,2,1,1,1,0]);
tileMap.push([1,1,1,1,2,2,1,1,0,0]);
tileMap.push([0,0,1,1,1,1,1,1,0,0]);
tileMap.push([0,0,0,1,1,1,1,1,0,0]);

let tileY = 0;

for(let i=0; i<tileMap.length; i++){
    const row = tileMap[i];
    for(let j=0; j<row.length; j++){
        const cellType = row[j];
      
        let tileX = cellSize * j;

        if(i % 2 !== 0){
            tileX += halfOffset;
        }

        if(cellType === 1){
            ctx.drawImage(landTile, tileX, tileY);
        }
        if(cellType === 2){ 
            ctx.drawImage(waterTile, tileX, tileY+sunkenOffset);
        }
    }

    tileY += altRowVOffset;
}

ctx.drawImage(landTile, halfOffset+cellSize*2, altRowVOffset);

