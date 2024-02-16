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
tileMap.push([0, 1,   1,1,2,2,1,1,0,0]);

tileMap.push([0, 1,   1,1,2,2,1,1,0,0]);
tileMap.push([0, 0,   1,1,2,2,1,1,0,0]);
tileMap.push([0, 1,   1,1,2,2,1,1,0,0]);
tileMap.push([1, 0,   1,1,2,2,1,1,1,0]);
tileMap.push([1, 1,   1,1,2,2,1,1,0,0]);
tileMap.push([0, 0,   1,1,1,1,1,1,0,0]);
tileMap.push([0, 0,   0,1,1,1,1,1,0,0]);
tileMap.push([0, 0, "1-1-1",1,1,1,1,1,0,0]);

let tileY = 0;

for(let i=0; i<tileMap.length; i++){
    const row = tileMap[i];
    for(let j=0; j<row.length; j++){
        let cellType = row[j];

        // split values like 1.1.1
        const str = cellType.toString();
        let layers = [];
        if(str.indexOf("-") > 0){
            let layerStrings = str.split("-");
            cellType = parseInt(layerStrings.shift());
            layers = layerStrings.map(str => parseInt(str));
        }
      
        let tileX = cellSize * j;

        if(i % 2 !== 0){
            tileX += halfOffset;
        }

        drawTile(cellType, tileX, tileY);

        for(let i=0; i<layers.length; i++){
            const type = layers[i];
            console.log(type);
            const layerOffset = (i+1) * halfOffset;
            const layerY = tileY - layerOffset;
            console.log(layerY);
            drawTile(type, tileX, layerY);
        }
    }

    tileY += altRowVOffset;
}

function drawTile(type, x, y){
    if(type === 1){
        ctx.drawImage(landTile, x, y);
    }
    if(type === 2){ 
        ctx.drawImage(waterTile, x, y+sunkenOffset);
    }
}

// ctx.drawImage(landTile, halfOffset+cellSize*2, altRowVOffset);

