/*-------------------------------- Imports --------------------------------*/

import { drawLine, drawFillTop, fillBottomLeft,
    fillTopRight, fillLeft, fillBottomRight, 
    fillTopLeft, fillRight, singleTile, halfTile
} from './js-files/cube.js'

/*-------------------------------- Constants --------------------------------*/

const colors = {
    line: "grey",
    top: "#E0E1DD",
    left: "#778DA9",
    right: "#415A77",
} 

const CUBES = 60

/*-------------------------------- Variables --------------------------------*/

let tileSize = 200; // must correspond with css file

let viewWidth = window.innerWidth;
let viewHeight = window.innerHeight; // defines number of rows TODO: scrollable site?

let tileCount = 5.5;

/*-------------------------------- Cached Elements --------------------------------*/

const canvasDiv = document.getElementById('canvases')
const secondCanvasDiv = document.getElementById('secondRow')
const newCanvases = document.getElementById('newCanvases')

/*-------------------------------- Functions --------------------------------*/

const createHalfCanvas = (parentEl, alternate=false, tileSize) => {

    const canvas = document.createElement('canvas');

    canvas.style.backgroundColor = 'thistle';
    canvas.width = tileSize / 2;
    canvas.height = tileSize;
    // canvas.style.width = '50px';
    // canvas.style.height = '100px';

    parentEl.appendChild(canvas);

    const context = canvas.getContext('2d')

    halfTile(context, tileSize, colors, alternate)

}


const createCanvas = (parentEl, tileSize) => {

    const canvas = document.createElement('canvas');

    canvas.style.backgroundColor = 'thistle';
    canvas.width = tileSize;
    canvas.height = tileSize;

    parentEl.appendChild(canvas);

    const context = canvas.getContext('2d')

    singleTile(context, tileSize, colors, 0, "love me")

}


const createRow = (parentEl, alternate=false, tileSize, tileCount) => {

    if (alternate) {
        createHalfCanvas(parentEl, false, tileSize)
    }
    
    for (let i = 0; i < Math.floor(tileCount); i++) {
        createCanvas(parentEl, tileSize)
    }
    
    if (!alternate) {
        createHalfCanvas(parentEl, true, tileSize)
    }

}

const rowDiv = (parentEl) => {
    const rowDivvy = document.createElement('div');

    rowDivvy.width = viewWidth;
    rowDivvy.height = tileSize;

    parentEl.appendChild(rowDivvy);
    return rowDivvy;
}

const updateTile = (width, tileCount) => {

    console.log("width is ", width, "tileCount is ", tileCount, "result is ", 
        Math.floor(width / tileCount)
    )
    return Math.floor(width / tileCount)

}

const numberOfTiles = (width) => {
    let count;
    if (width > 1000) {
        count = 6.5
    } else if (width > 700) {
        count = 5.5
    } else if (width > 500) {
        count = 4.5
    } else {
        count = 3.5
    }
    return count
}

const renderCubes = () => {

    tileCount = numberOfTiles(viewWidth)
    tileSize = updateTile(viewWidth, tileCount)

    canvasDiv.style.width = `${viewWidth}px`
    secondCanvasDiv.style.width = `${viewWidth}px`
    canvasDiv.style.height = `${tileSize}px`
    secondCanvasDiv.style.height = `${tileSize}px`

    console.log("tile size is ", tileSize)
    console.log("canvas div ", canvasDiv.style.width)
    console.log("canvas div height ", canvasDiv.style.height)
    // tileSize = 200

    const rows = CUBES / Math.floor(tileCount)
    console.log("rows are ", rows)

    const totalHeight = rows * viewHeight

    let alter = false
    for (let i = 0; i < rows; i++) {

        const newRowDiv = rowDiv(newCanvases)

        newRowDiv.style.height = `${tileSize}px`
        createRow(newRowDiv, alter, tileSize, tileCount)

        alter = !alter
        console.log("alter is ", alter)

    }

    // for (let i = 0; i < rows; i++) {
    //     if (!alter) {
    //         createRow(canvasDiv, false, tileSize, tileCount)
    //     } else if (alter) {
    //         createRow(secondCanvasDiv, true, tileSize, tileCount)
    //     }
    //     alter = !alter
    //     console.log("alter is ", alter)
    // }

    // createRow(canvasDiv, false, tileSize, tileCount)
    // createRow(secondCanvasDiv, true, tileSize, tileCount)


}

/*-------------------------------- Function calls --------------------------------*/


/*-------------------------------- Event Listeners --------------------------------*/

window.addEventListener("load", () => {

    renderCubes();
    
})

window.addEventListener("resize", () => {
    console.log("window resized ", window.innerWidth, window.innerHeight)
    viewWidth = window.innerWidth;
    viewHeight = window.innerHeight;

    canvasDiv.innerHTML = ""
    secondCanvasDiv.innerHTML = ""
    newCanvases.innerHTML = ""
    renderCubes();
})