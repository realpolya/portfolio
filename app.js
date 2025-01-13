/*-------------------------------- Imports --------------------------------*/

import { singleTile, halfTile } from './js-files/cube.js'

import colors from './js-files/colors.js'

/*-------------------------------- Constants --------------------------------*/

const CUBES = 60
const startCubes = [1, 5, 13, 21, 33]
// TODO: figure out the formula that works for all the cubes
const linkOrders = ["hom",]

// extra arrays for coloring cubes
const belowLeft = [];
const belowRight = [];

// keep track of half cubes
const halves = []

/* 

cubes:
- homi
- savor
- gourds
- battleship
- points unknown ?

- portfolio (realpolya) - 1 cube
- linked in

- fun fact cube
- photo cube

*/

/*-------------------------------- Variables --------------------------------*/

let tileSize = 200; // must correspond with css file

let viewWidth = window.innerWidth;

let tileCount = 5.5; // beginner count
let cubeCount = 0
let colorCubes = [] // order of colored cubes

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

    halfTile(context, tileSize, colors, alternate, cubeCount)

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

            // TODO: create single formula
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
        cubeCount += 0.5
        createHalfCanvas(parentEl, false, tileSize)
    }
    
    for (let i = 0; i < Math.floor(tileCount); i++) {
        // increment cube count
        cubeCount += 1
        createCanvas(parentEl, tileSize)
    }
    
    if (!alternate) {
        cubeCount += 0.5
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

const calculateHalves = (tileCount, halfCubes) => {
    let first = Math.floor(tileCount) + 1
    for (let i = first; i < CUBES + halfCubes; i += ((tileCount * 2))) {
        halves.push(i)
    }
    console.log("halves are ", halves)
}

const pickColorCubes = () => {
    return startCubes.map(num => {
        if (!halves.includes(num)) {
            return num
        }
        return num + 1
    })
}

const renderCubes = () => {

    tileCount = numberOfTiles(viewWidth)
    tileSize = updateTile(viewWidth, tileCount)

    const rows = CUBES / Math.floor(tileCount)
    const halfCubes = Math.floor(0.5 * rows)
    calculateHalves(tileCount, halfCubes)
    colorCubes = pickColorCubes()

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
    halves.length = 0

    // re-render
    renderCubes();

})