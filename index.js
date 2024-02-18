import { drawTileMap } from "./utils/drawTileMap.js";
import { loadImage } from "./utils/loadImage.js";

// Write Javascript code!
const canvas = document.getElementById('artCanvas');
const refCanvas = document.getElementById('referenceCanvas');

const referenceMap = await loadImage("/assets/cumbria-map.jpg");

// test tile Map
const testTileMap = [];
testTileMap.push([0, 1,   1,1,2,2,1,1,0,0]);
testTileMap.push([0, 1,   1,1,2,2,1,1,0,0]);
testTileMap.push([0, 0,   1,1,2,2,1,1,0,0]);
testTileMap.push([0, 1,   1,1,2,2,1,1,0,0]);
testTileMap.push([1, 0,   1,1,2,2,1,1,1,0]);
testTileMap.push([1, 1,   1,1,2,2,1,1,0,0]);
testTileMap.push([0, 0,   1,1,1,"1-1-1-1",1,1,0,0]);
testTileMap.push([0, 0,   0,1,1,1,1,1,0,0]);
testTileMap.push([0, 0, "1-2-1-2",1,1,1,1,1,0,0]);

// reference map
const refCtx = refCanvas.getContext("2d");
const {width,height} = referenceMap;
refCanvas.width = width;
refCanvas.height = height;
refCtx.drawImage(referenceMap,0,0, refCanvas.width, refCanvas.height);

// guide grid
const gridCellsAcross = 40;
const gridCellSize = width / gridCellsAcross;
const gridCellsDown = height / gridCellSize;

// create grid with zeros for all
const tileTypeGrid = [];
//
for(let i=0; i<gridCellsDown; i++){
    let row = [];
    for(let j=0; j<gridCellsAcross;j++){
        row.push("0");
    }
    tileTypeGrid.push(row);
}

refCtx.font = `${gridCellSize}px sans serif`;
refCtx.textAlign = "left";
refCtx.textBaseline = "hanging";

refCtx.strokeStyle = "rgba(0,0,0,0.3)";
for(let a=0; a<gridCellsDown; a++){
    for(let b=0; b<gridCellsAcross; b++){
        let xPos = b*gridCellSize;
        let yPos = a*gridCellSize;
        refCtx.strokeRect(xPos, yPos, gridCellSize, gridCellSize);

        const cellType = tileTypeGrid[a][b];

        refCtx.fillText(cellType, xPos+4, yPos + 2);
    }
}

drawTileMap(canvas,testTileMap);

