/* contains color functions */

/*-------------------------------- Imports --------------------------------*/

import define from "./definepaths.js";

/*-------------------------------- Functions --------------------------------*/

const getColor = (special, colors, cubeSide) => {

    const mode = sessionStorage.getItem("theme");
    let color;

    if (special) {

        if (special.project === "mode" && mode === "dark") {
            color = colors[cubeSide];
        } else if (mode === "dark") {
            color = colors[`${cubeSide}${special.project}d`];
        } else {
            color = colors[`${cubeSide}${special.project}`];
        }

    } else {
        
        if (mode === "dark") {
            color = colors[`${cubeSide}mode`];
        } else {
            color = colors[cubeSide];
        }
    }

    return color;

}


const getBelowColor = (specialBelow, colors, cubeSide) => {

    const mode = sessionStorage.getItem("theme");
    let color;

    if (specialBelow[0] === cubeSide) {
        if (mode === "dark" && specialBelow[1] === "mode") {
            color = colors[cubeSide];
        } else if (mode === "dark") {
            color = colors[`${cubeSide}${specialBelow[1]}d`];
        } else {
            color = colors[`${cubeSide}${specialBelow[1]}`];
        }
    } else if (specialBelow[2] === cubeSide) {
        if (mode === "dark") {
            color = colors[`${cubeSide}${specialBelow[3]}d`];
        } else {
            color = colors[`${cubeSide}${specialBelow[3]}`];
        }
    } else {
        if (mode === "dark") {
            color = colors[`${cubeSide}mode`];
        } else {
            color = colors[cubeSide];
        }
    }

    return color;

}


/*-------------------------------- Color Game Functions --------------------------------*/


const colorCube = (el, ctx, start, mid, end, getUserColor, size, half=false) => {


    // TODO: if any other part of the canvas is clicked on except the top,
    // another canvas needs to be activated as well

    el.addEventListener('click', (e) => {

        const rect = el.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        if (half) {
            define.topPathHalf(ctx, start, size, half.alternate)
        } else {
            define.topPath(ctx, start, mid, end)
        }

        if (ctx.isPointInPath(x, y)) {

            let userColor = getUserColor()
            ctx.fillStyle = userColor
            ctx.fill()

        }

    })

}


/*-------------------------------- Exports --------------------------------*/

export { getColor, getBelowColor, colorCube }