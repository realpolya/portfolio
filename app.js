/*-------------------------------- Imports --------------------------------*/

import { drawLine, drawFillTop, fillBottomLeft,
    fillTopRight, fillLeft, fillBottomRight, 
    fillTopLeft, fillRight, singleTile, halfTile
} from './js-files/cube.js'

/*-------------------------------- Constants --------------------------------*/

const lineColor = "grey"
const topColor = "#E0E1DD"
const leftColor = "#778DA9"
const rightColor = "#415A77"

const colors = {
    line: "grey",
    top: "#E0E1DD",
    left: "#778DA9",
    right: "#415A77",
}

const tileSize = 200; // must correspond with css file

/*-------------------------------- Cached Elements --------------------------------*/

const canvasDiv = document.getElementById('canvases')
const secondCanvasDiv = document.getElementById('secondRow')

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
    // canvas.style.width = '100px';
    // canvas.style.height = '100px';

    parentEl.appendChild(canvas);

    const context = canvas.getContext('2d')

    singleTile(context, tileSize, colors, 0, "love me")

}


const createRow = (parentEl, alternate=false, tileSize) => {

    if (alternate) {
        createHalfCanvas(secondCanvasDiv, false, tileSize)
        createCanvas(secondCanvasDiv, tileSize)
        createCanvas(secondCanvasDiv, tileSize)
        createCanvas(secondCanvasDiv, tileSize)
    } else {
        createCanvas(parentEl, tileSize)
        createCanvas(parentEl, tileSize)
        createCanvas(parentEl, tileSize)
        createHalfCanvas(parentEl, true, tileSize)
    }

}

/*-------------------------------- Function calls --------------------------------*/

createRow(canvasDiv, false, tileSize)
createRow(canvasDiv, true, tileSize)