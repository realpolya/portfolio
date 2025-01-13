/*-------------------------------- Imports --------------------------------*/

import { singleTile, halfTile } from './js-files/cube.js'

import colors from './js-files/colors.js'

/*-------------------------------- Constants --------------------------------*/

const CUBES = 60
const colorCubes = [5, 15, 48] // order of colored cubes
// TODO: figure out the formula that works for all the cubes
const linkOrders = ["hom",]

// extra arrays for coloring cubes
const belowLeft = [];
const belowRight = [];

/*-------------------------------- Variables --------------------------------*/

let tileSize = 200; // must correspond with css file

let viewWidth = window.innerWidth;

let tileCount = 5.5; // beginner count
let cubeCount = 0

/*-------------------------------- Cached Elements --------------------------------*/

const newCanvases = document.getElementById('newCanvases')

/*-------------------------------- Functions --------------------------------*/

const createHalfCanvas = (parentEl, alternate=false, tileSize) => {

    const canvas = document.createElement('canvas');

    canvas.style.backgroundColor = 'thistle';
    canvas.width = tileSize / 2;
    canvas.height = tileSize;

    parentEl.appendChild(canvas);

    const context = canvas.getContext('2d')

    halfTile(context, tileSize, colors, alternate)

}


const createCanvas = (parentEl, tileSize) => {

    let special = false;
    let specialBelow = false;

    const canvas = document.createElement('canvas');

    canvas.style.backgroundColor = 'thistle';
    canvas.width = tileSize;
    canvas.height = tileSize;

    colorCubes.forEach(num => {
        if (num === cubeCount) {
            canvas.id = "homi-link" // create id to add event listener later

            special = {
                link: linkOrders[0],
                order: num,
                text: "wonderful"
            } // TODO: increment later

            console.log(`num is ${num}, tileCount is ${Math.floor(tileCount)}, below left is ${num + Math.floor(tileCount)}, below right is ${num + Math.ceil(tileCount)}`)

            if (tileCount >= 5.5) {
                belowLeft.push(num + Math.ceil(tileCount) - 1)
                belowRight.push(num + Math.floor(tileCount) - 1)
            } else {
                belowLeft.push(num + Math.ceil(tileCount))
                belowRight.push(num + Math.floor(tileCount))
            }
        }
    })

    if (belowLeft.includes(cubeCount)) {
        specialBelow = "left"
    } else if (belowRight.includes(cubeCount)) {
        specialBelow = "right"
    }

    parentEl.appendChild(canvas);
    const context = canvas.getContext('2d')

    if (special) {
        singleTile(context, tileSize, colors, special, false, cubeCount)
    } else if (specialBelow) {
        singleTile(context, tileSize, colors, false, specialBelow, cubeCount)
    } else {
        singleTile(context, tileSize, colors, false, false, cubeCount)
    }

}


const createRow = (parentEl, alternate=false, tileSize, tileCount) => {

    if (alternate) {
        createHalfCanvas(parentEl, false, tileSize)
    }
    
    for (let i = 0; i < Math.floor(tileCount); i++) {
        // increment cube count
        cubeCount += 1
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

const updateTile = (width, tileCount) => Math.floor(width / tileCount);

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

    const rows = CUBES / Math.floor(tileCount)

    let alter = false
    for (let i = 0; i < rows; i++) {

        const newRowDiv = rowDiv(newCanvases)

        newRowDiv.style.height = `${tileSize}px`
        createRow(newRowDiv, alter, tileSize, tileCount)

        alter = !alter
    }


}

/*-------------------------------- Function calls --------------------------------*/


/*-------------------------------- Event Listeners --------------------------------*/

window.addEventListener("load", () => {

    renderCubes();
    
})

window.addEventListener("resize", () => {

    viewWidth = window.innerWidth;

    // reset
    cubeCount = 0
    belowLeft.length = 0
    belowRight.length = 0
    newCanvases.innerHTML = ""

    // re-render
    renderCubes();

})