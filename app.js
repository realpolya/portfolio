/*-------------------------------- Imports --------------------------------*/

import { drawLine, drawFillTop, fillBottomLeft,
    fillTopRight, fillLeft, fillBottomRight, 
    fillTopLeft, fillRight, singleTile, leftHalfTile
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

/*-------------------------------- Cached Elements --------------------------------*/

const canvasDiv = document.getElementById('canvases')
const secondCanvasDiv = document.getElementById('secondRow')

/*-------------------------------- Functions --------------------------------*/

const createHalfCanvas = (parentEl) => {

    const canvas = document.createElement('canvas');

    canvas.style.backgroundColor = 'thistle';
    canvas.width = 50;
    canvas.height = 100;
    canvas.style.width = '50px';
    canvas.style.height = '100px';

    parentEl.appendChild(canvas);

    const context = canvas.getContext('2d')

    leftHalfTile(context, 100, colors)

}

const createCanvas = (parentEl) => {

    const canvas = document.createElement('canvas');

    canvas.style.backgroundColor = 'thistle';
    canvas.width = 100;
    canvas.height = 100;
    canvas.style.width = '100px';
    canvas.style.height = '100px';

    parentEl.appendChild(canvas);

    const context = canvas.getContext('2d')

    singleTile(context, 100, colors)

}


const createRow = (parentEl, alternate=false) => {

    createCanvas(parentEl)
    createCanvas(parentEl)
    createCanvas(parentEl)

}

/*-------------------------------- Function calls --------------------------------*/

createRow(canvasDiv)

createHalfCanvas(secondCanvasDiv)
createCanvas(secondCanvasDiv)
createCanvas(secondCanvasDiv)
createCanvas(secondCanvasDiv)