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

/*-------------------------------- Variables --------------------------------*/

let tileSize = 200; // must correspond with css file

let viewWidth = window.innerWidth;
let viewHeight = window.innerHeight;

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
        // introduce loop
        createCanvas(secondCanvasDiv, tileSize)
        createCanvas(secondCanvasDiv, tileSize)
        createCanvas(secondCanvasDiv, tileSize)
    } else {
        // introduce loop
        createCanvas(parentEl, tileSize)
        createCanvas(parentEl, tileSize)
        createCanvas(parentEl, tileSize)
        createHalfCanvas(parentEl, true, tileSize)
    }

}

const updateTile = (width, height) => {

    let size;
    if (width > 1000) {
        size = width / 5
    } else if (width > 700) {
        size = width / 4
    } else {
        size = width / 3
    }
    return Math.floor(size)

}

const renderCubes = () => {

    tileSize = updateTile(viewWidth, viewHeight)
    canvasDiv.style.width = `${viewWidth}px`
    secondCanvasDiv.style.width = `${viewWidth}px`
    canvasDiv.style.height = `${tileSize}px`
    secondCanvasDiv.style.height = `${tileSize}px`
    console.log("tile size is ", tileSize)
    console.log("canvas div ", canvasDiv.style.width)
    console.log("canvas div height ", canvasDiv.style.height)
    // tileSize = 200
    createRow(canvasDiv, false, tileSize)
    createRow(canvasDiv, true, tileSize)

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
    renderCubes();
})