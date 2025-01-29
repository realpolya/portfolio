/* contains color functions */

/*-------------------------------- Imports --------------------------------*/

import define from "./definepaths.js";

/*-------------------------------- Functions --------------------------------*/

const defineArr = Object.values(define)

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


const colorCube = (el, ctx, start, mid, end, getUserColor, size, half=false, 
    special=false, specialBelow=false) => {

    el.addEventListener('click', (e) => {

        const rect = el.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top


        const clickFnHalf = (i) => {
            defineArr[i](ctx, start, size, half.alternate)
            if (ctx.isPointInPath(x, y)) {
        
                ctx.fillStyle = getUserColor()
                ctx.fill()
    
            }
        }

        const clickFn = (i) => {
            defineArr[i](ctx, start, mid, end)
            if (ctx.isPointInPath(x, y)) {
        
                ctx.fillStyle = getUserColor()
                ctx.fill()
    
            }
        }

        // conditions
        if (half) {

            for (let i = 5; i < 8; i++) clickFnHalf(i);

        } 
        else if (special) {

            for (let i = 1; i < 3; i++) clickFn(i);

        } 
        else if (specialBelow) {

            if (specialBelow.includes("left") && specialBelow.includes("right")) {
                
                clickFn(0);
                for (let i = 3; i < 5; i++) clickFn(i);

            } else if (specialBelow.includes("left")) {
                
                for (let i = 0; i < 2; i++) clickFn(i);
                for (let i = 3; i < 5; i++) clickFn(i);

            } else if (specialBelow.includes("right")) {

                clickFn(0);
                for (let i = 2; i < 5; i++) clickFn(i);
                
            }
        }
        else {
    
            for (let i = 0; i < 5; i++) clickFn(i);

        }

    })

}


/*-------------------------------- Exports --------------------------------*/

export { getColor, getBelowColor, colorCube }