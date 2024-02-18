import { loadImage } from "./loadImage.js";

const waterTile = await loadImage("/assets/water.png");
const landTile = await loadImage("/assets/land.png");

export function drawTileMap(canvas, tileMap){

    const cellSize = 32;
    const cellsAcross = 10;
    const halfOffset = cellSize / 2;
    const sunkenOffset = 6;
    const altRowVOffset = 8;

    canvas.width = cellsAcross * cellSize;
    canvas.height = tileMap.length * altRowVOffset + cellSize;
    const ctx = canvas.getContext("2d");

    let tileY = 0;
    
    for(let i=0; i<tileMap.length; i++){
        const row = tileMap[i];
        for(let j=0; j<row.length; j++){
            let cellType = row[j];
    
            // split values like 1-1-1
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
    
            drawTile(ctx, cellType, tileX, tileY,sunkenOffset);
    
            for(let i=0; i<layers.length; i++){
                const type = layers[i];
                const layerOffset = (i+1) * halfOffset;
                const layerY = tileY - layerOffset;
                drawTile(ctx, type, tileX, layerY,sunkenOffset);
            }
        }
    
        tileY += altRowVOffset;
    }
}

function drawTile(ctx, type, x, y, sunkenOffset){
    if(type === 1){
        ctx.drawImage(landTile, x, y);
    }
    if(type === 2){ 
        ctx.drawImage(waterTile, x, y+sunkenOffset);
    }
}