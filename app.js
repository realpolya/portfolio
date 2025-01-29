/*-------------------------------- Imports --------------------------------*/

import { singleTile, halfTile } from './js-files/cube.js'
import { closeEl, openEl } from './js-files/popup.js'
import { colorCube } from './js-files/getcolors.js'

import colors from './js-files/colors.js'

/*-------------------------------- Constants --------------------------------*/

const CUBES = 60

const startCubes = [1, 3, 5, 9, 15, 18, 22, 30, 32, 40, 45, 49, 58]

// order of projects
const linkOrders = ["mode", "homi", "savo", "gour", "batt", "resu", "gith", "liin", "funf", "phot", "yout", "port", "game"]
const textOrders = ["dark/light", "homi", "savor the seasons", 
    "gourds and grocers", "battleship", "resume", "github", "Linked In", 
    "fun fact!", "", "RP channel", "Real Polya website", "coloring game"]
const iconSrcs = ["./assets/cube.ico", "./assets/homi2.png", "./assets/savor.png",
    "./assets/gourds.png", "./assets/battleship.png", "./assets/resume.png", "./assets/git.png",
    "./assets/linked.png", "./assets/funfact.png", "./assets/photo1.png",
    "./assets/yt.png", "./assets/rp.png", "./assets/artist.png"
]
const linksToSites = ["mode", "https://homi-realpolya.netlify.app/", "https://savor-the-seasons.netlify.app/",
    "https://gourds-and-grocers-fc1e690d830c.herokuapp.com/", "https://realpolya.github.io/battleship-game/index.html",
    "./assets/resume.pdf", "https://github.com/realpolya", "https://www.linkedin.com/in/realpolya/", "", "", 
    "https://www.youtube.com/realpolya", "https://realpolya.com/", ""
]

// extra arrays for coloring cubes
const belowLeft = [];
const belowRight = [];

// keep track of half cubes
const halves = []

// theme constants
const currentTheme = sessionStorage.getItem("theme")
const colorPickerInitial = "#FFFFFF"
const darkBackColor = "#1A1F16"
const darkPopupColor = "#12170E"
const darkPopupText = "#92A086"
const darkResetButton = "#162F17"

// about button dark version
const aboutButtonBack = "#85AB81"
const aboutButtonBorder = "solid 2px #477542"
const aboutButtonText = "#465D43"


/*-------------------------------- Cached Elements --------------------------------*/

// all canvases
const newCanvases = document.getElementById('newCanvases')

const bodyEl = document.getElementById('bodyEl')

const centeredEl = document.getElementById('centered')
const funfactEl = document.getElementById('div-funfact')
const gameEl = document.getElementById('div-colorgame')

const colorPicker = document.getElementById('color-input')

const closeButton = document.getElementById('button-close')
const funCloseButton = document.getElementById('button-funfact')
const aboutButton = document.getElementById('button-main')
const gameCloseButton = document.getElementById('button-colorgame')
const gameHideButton = document.getElementById('button-hide-colorgame')
const paletteButton = document.getElementById('button-palette')
const resetColorButton = document.getElementById('button-reset-color')

const footerEl = document.getElementById('footer-text')


/*-------------------------------- Variables --------------------------------*/

let tileSize = 200; // starting point

let viewWidth = window.innerWidth;

// number of tiles in a row
let tileRowCount = 5.5;

// number of individual cubes
let cubeCount = 0
let colorCubes = [] // order of colored cubes

let linkCounter = 0;
let userColor = colorPicker.value

/*-------------------------------- Functions --------------------------------*/

const getUserColor = () => {
    return userColor
}

const getGameStatus = () => {
    return sessionStorage.getItem("game")
}

// get all of the cubes below the special cube
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


// create half canvas at the beginning or end of row
const createHalfCanvas = (parentEl, alternate=false, tileSize) => {
    
    let count = Math.ceil(cubeCount)
    const canvas = document.createElement('canvas');

    canvas.style.backgroundColor = 'thistle';
    canvas.width = tileSize / 2;
    canvas.height = tileSize;

    parentEl.appendChild(canvas);

    const context = canvas.getContext('2d')
    let specialBelow = getBelow();

    const start = 0
    const mid = start + Math.floor(tileSize / 2)
    const end = start + tileSize;
    const half = { alternate }

    if (getGameStatus() === "open") colorCube(canvas, context, start, mid, end, getUserColor, tileSize, half, false, specialBelow)

    halfTile(context, tileSize, colors, alternate, count, specialBelow)

}

// canvas element
const createCanvas = (parentEl, tileSize) => {

    let special = false;
    let photo = false;
    const canvas = document.createElement('canvas');

    canvas.width = tileSize;
    canvas.height = tileSize;

    // to open a funfact box
    if (cubeCount + Math.ceil(tileRowCount) === colorCubes[8]) {
        canvas.id = "above-funfact"
    }

    colorCubes.forEach(num => {
        if (num === cubeCount) {

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
            } else if (special.project === "funf") {
                special.idEl = "above-funfact"
            }

            belowLeft.push([num + Math.ceil(tileRowCount), special.project])
            belowRight.push([num + Math.floor(tileRowCount), special.project])

            linkCounter += 1

        }
    })

    let specialBelow = getBelow()
    
    parentEl.appendChild(canvas);
    const context = canvas.getContext('2d')
    const start = 0
    const mid = start + Math.floor(tileSize / 2)
    const end = start + tileSize;

    if (getGameStatus() === "open") colorCube(canvas, context, start, mid, end, getUserColor, tileSize, false, special, specialBelow)

    singleTile(context, tileSize, colors, special, specialBelow, cubeCount, photo, 
    start, mid, end)

}


// canvases and half-canvases for single row
const createRow = (parentEl, alternate=false, tileSize, tileRowCount) => {

    if (alternate) {
        cubeCount += 0.5
        createHalfCanvas(parentEl, false, tileSize)
    }
    
    for (let i = 0; i < Math.floor(tileRowCount); i++) {
        // increment cube count
        cubeCount += 1
        createCanvas(parentEl, tileSize)
    }
    
    if (!alternate) {
        cubeCount += 0.5
        createHalfCanvas(parentEl, true, tileSize)
    }

}

// append new row to the parent div
const rowDiv = (parentEl) => {
    const rowDivvy = document.createElement('div');

    rowDivvy.width = viewWidth;
    rowDivvy.height = tileSize;

    parentEl.appendChild(rowDivvy);
    return rowDivvy;
}


// calculate tile size
const updateTileSize = (width, tileRowCount) => Math.floor(width / tileRowCount);


// number of tiles in a single row (dynamic)
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


// which cubes are becoming split into separate rows
const calculateHalves = (tileRowCount, halfCubes) => {
    let first = Math.floor(tileRowCount) + 1
    for (let i = first; i < CUBES + halfCubes; i += ((tileRowCount * 2))) {
        halves.push(i)
    }
}


// recalibrate cube numbers based on occupied ones and halves
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


// main function to render all of the cubes
const renderCubes = () => {

    tileRowCount = numberOfTiles(viewWidth)
    tileSize = updateTileSize(viewWidth, tileRowCount) // establish tile size dynamically

    const rows = CUBES / Math.floor(tileRowCount)
    const halfCubes = Math.floor(0.5 * rows)
    calculateHalves(tileRowCount, halfCubes)
    colorCubes = pickColorCubes()

    let alter = false
    for (let i = 0; i < rows; i++) {

        const newRowDiv = rowDiv(newCanvases)

        newRowDiv.style.height = `${tileSize}px`
        createRow(newRowDiv, alter, tileSize, tileRowCount)

        alter = !alter
    }

}


// reset everything before re-rendering
const totalReset = () => {

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

}


const changeThemeColor = (theme) => {
    if (theme === "dark") {

        bodyEl.style.backgroundColor = darkBackColor

        centeredEl.style.backgroundColor = darkPopupColor
        funfactEl.style.backgroundColor = darkPopupColor
        closeButton.style.backgroundColor = darkPopupColor
        funCloseButton.style.backgroundColor = darkPopupColor
        gameEl.style.backgroundColor = darkPopupColor
        gameHideButton.style.backgroundColor = darkPopupColor
        gameCloseButton.style.backgroundColor = darkPopupColor

        colorPicker.style.backgroundColor = darkResetButton
        resetColorButton.style.backgroundColor = darkResetButton
        

        centeredEl.style.color = darkPopupText
        funfactEl.style.color = darkPopupText
        closeButton.style.color = darkPopupText
        funCloseButton.style.color = darkPopupText
        gameEl.style.color = darkPopupText
        gameHideButton.style.color = darkPopupText
        gameCloseButton.style.color = darkPopupText
        resetColorButton.style.color = darkPopupText

        aboutButton.style.backgroundColor = aboutButtonBack
        aboutButton.style.border = aboutButtonBorder
        aboutButton.style.color = aboutButtonText


    } else {

        footerEl.style.color = darkBackColor

    }
}


/*-------------------------------- Function Calls --------------------------------*/

closeEl(closeButton, centeredEl)
openEl(aboutButton, centeredEl)

closeEl(funCloseButton, funfactEl)

closeEl(gameHideButton, gameEl)
closeEl(gameCloseButton, gameEl, true)
closeEl(gameCloseButton, paletteButton)
openEl(paletteButton, gameEl)

/*-------------------------------- Event Listeners --------------------------------*/


window.addEventListener("load", () => {
    
    if (!currentTheme) sessionStorage.setItem("theme", "light")
    if (!getGameStatus()) sessionStorage.setItem("closed")

    // reload the game popup after resetting the canvases
    if (sessionStorage.getItem("showGameEl") === "true") {

        gameEl.style.display = "block";
        paletteButton.style.display = "block";
        bodyEl.style.cursor = "crosshair";
        sessionStorage.removeItem("showGameEl");

    } else {

        bodyEl.style.cursor = "default"

    }

    changeThemeColor(currentTheme);
    renderCubes();

})


colorPicker.addEventListener("input", (e) => {
    userColor = e.target.value;
})


resetColorButton.addEventListener("click", () => {

    sessionStorage.setItem("showGameEl", "true");

    userColor = colorPickerInitial;
    location.reload();
    gameEl.style.display = "block";

})

/*-------------------------------- Reset --------------------------------*/

window.addEventListener("resize", totalReset)
funCloseButton.addEventListener("click", totalReset)