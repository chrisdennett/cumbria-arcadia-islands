import { drawTileMap } from "./utils/drawTileMap.js";
import { loadImage } from "./utils/loadImage.js";

// Write Javascript code!
const canvas = document.getElementById('artCanvas');
const refCanvas = document.getElementById('referenceCanvas');

const referenceMap = await loadImage("/assets/cumbria-map.jpg");

// change to be "nothing", "land", "sea", "beach", "lake" "mountain", "riverLeftRight", "riverRightLeft"
const tileTypes = ["", "0","1","2"];

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


// guide grid
const gridCellsAcross = 40;
const gridCellSize = width / gridCellsAcross;
const gridCellsDown = height / gridCellSize;

// create grid with zeros for all
const tileTypeGrid = getTileTypeGrid(gridCellsDown, gridCellsAcross);
drawTileTypeRefGrid();


refCanvas.addEventListener("click", (e) => {
    const clickX = e.offsetX;
    const clickY = e.offsetY;

    const cellCol = Math.floor(clickX / gridCellSize);
    const cellRow = Math.floor(clickY / gridCellSize);

    // todo - put this into a separate function to get next type
    const currType = tileTypeGrid[cellRow][cellCol];
    const currTypeIndex = tileTypes.indexOf(currType);
    const nextIndex = currTypeIndex === tileTypes.length -1 ? 0 : currTypeIndex + 1;
    const nextType = tileTypes[nextIndex];

    tileTypeGrid[cellRow][cellCol] = nextType;
    drawTileTypeRefGrid();
    drawTileMap(canvas,tileTypeGrid);
})

function getTileTypeGrid(gridCellsDown, gridCellsAcross){
    const tileTypeGrid = [];
    //
    for(let i=0; i<gridCellsDown; i++){
        let row = [];
        for(let j=0; j<gridCellsAcross;j++){
            row.push("");
        }
        tileTypeGrid.push(row);
    }
    return tileTypeGrid;
}

function drawTileTypeRefGrid(){
    refCtx.drawImage(referenceMap,0,0, refCanvas.width, refCanvas.height);
    refCtx.font = `${gridCellSize}px sans serif`;
    refCtx.textAlign = "left";
    refCtx.textBaseline = "hanging";

    refCtx.strokeStyle = "rgba(0,0,0,0.15)";
    for(let a=0; a<gridCellsDown; a++){
        for(let b=0; b<gridCellsAcross; b++){
            let xPos = b*gridCellSize;
            let yPos = a*gridCellSize;
            

            const cellType = tileTypeGrid[a][b];

            refCtx.fillText(cellType, xPos+4, yPos + 2);

            refCtx.strokeRect(xPos, yPos, gridCellSize, gridCellSize);
        }
    }
}



