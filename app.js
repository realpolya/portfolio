/*-------------------------------- Imports --------------------------------*/

import { singleTile, halfTile } from './js-files/cube.js'

import colors from './js-files/colors.js'
import funfcolors from './js-files/animcolors.js'

/*-------------------------------- Constants --------------------------------*/

const CUBES = 60

const startCubes = [1, 5, 8, 15, 18, 22, 30, 32, 40]
const linkOrders = ["homi", "savo", "gour", "batt", "port", "liin", "funf", "phot", "yout"]
const textOrders = ["homi", "savor the seasons", 
    "gourds and grocers", "battleship", "Real Polya website", "Linked In", 
    "fun fact!", "", "RP channel"]
const iconSrcs = ["./assets/homi.png", "./assets/savor.png",
    "./assets/gourds.png", "./assets/battleship.png", "./assets/rp.png",
    "./assets/linked.png", "./assets/funfact.png", "./assets/photo1.png",
    "./assets/yt.png"
]
const linksToSites = ["https://homi-realpolya.netlify.app/", "https://savor-the-seasons.netlify.app/",
    "https://gourds-and-grocers-fc1e690d830c.herokuapp.com/", "https://realpolya.github.io/battleship-game/index.html",
    "https://realpolya.com/", "https://www.linkedin.com/in/realpolya/"
]

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

// TODO: introduce a game Color a Cube!

/*-------------------------------- Variables --------------------------------*/

let tileSize = 200; // must correspond with css file

let viewWidth = window.innerWidth;

let tileCount = 5.5; // beginner count
let cubeCount = 0
let colorCubes = [] // order of colored cubes

let linkCounter = 0;

/*-------------------------------- Cached Elements --------------------------------*/

const newCanvases = document.getElementById('newCanvases')

/*-------------------------------- Functions --------------------------------*/


const getBelow = () => {

    let specialBelow = false;

    belowLeft.forEach(pair => {
        if (pair.includes(Math.ceil(cubeCount))) {
            specialBelow = ["left", pair[1]]
        }
    })

    belowRight.forEach(pair => {
        if (pair.includes(Math.ceil(cubeCount))) {
            if (specialBelow) {
                specialBelow.push("right", pair[1])
            } else {
                specialBelow = ["right", pair[1]]
            }
        }
    })

    return specialBelow;

}


const createHalfCanvas = (parentEl, alternate=false, tileSize) => {
    
    let count = Math.ceil(cubeCount)
    const canvas = document.createElement('canvas');

    canvas.style.backgroundColor = 'thistle';
    canvas.width = tileSize / 2;
    canvas.height = tileSize;

    parentEl.appendChild(canvas);

    const context = canvas.getContext('2d')
    let specialBelow = getBelow();

    halfTile(context, tileSize, colors, alternate, count, specialBelow)

}


// one canvas at a time
const createCanvas = (parentEl, tileSize) => {

    let special = false;
    let photo = false;
    const canvas = document.createElement('canvas');

    canvas.width = tileSize;
    canvas.height = tileSize;

    colorCubes.forEach(num => {
        if (num === cubeCount) {

            // canvas.id = "homi-link" // TODO: create id to add event listener later
            special = {
                project: linkOrders[linkCounter],
                order: num,
                text: textOrders[linkCounter],
                icon: iconSrcs[linkCounter],
                link: linksToSites[linkCounter],
                el: canvas
            }

            if (special.project === "phot") {
                photo = true
            }

            if (special.project === "funf") {
                special.funf = funfcolors
                special.funforder = ["funf", "funfa"]
            }
        
            belowLeft.push([num + Math.ceil(tileCount), special.project])
            belowRight.push([num + Math.floor(tileCount), special.project])

            linkCounter += 1

        }
    })

    let specialBelow = getBelow()

    parentEl.appendChild(canvas);
    const context = canvas.getContext('2d')

    singleTile(context, tileSize, colors, special, specialBelow, cubeCount, photo)

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
    } else if (width > 400) {
        count = 3.5
    } else {
        count = 2.5
    }
    return count
}


const calculateHalves = (tileCount, halfCubes) => {
    let first = Math.floor(tileCount) + 1
    for (let i = first; i < CUBES + halfCubes; i += ((tileCount * 2))) {
        halves.push(i)
    }
}


const pickColorCubes = () => {
    const occupied = []
    return startCubes.map(num => {
        if (!halves.includes(num) && !occupied.includes(num)) {
            occupied.push(num)
            return num
        }
        occupied.push(num + 1)
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
    linkCounter = 0

    // re-render
    renderCubes();

})

// Check if the document's fonts have loaded
document.fonts.ready.then(() => {
    // Reload the page once fonts are fully loaded
    if (!sessionStorage.getItem("fontLoaded")) {
        sessionStorage.setItem("fontLoaded", "true"); // Prevent infinite reload loop
        location.reload(); // Reload the page
    }
});