/* contain cube geometry */

/*-------------------------------- Imports --------------------------------*/

import { textInCube, renderIcon, redirectCube, colorMode } from "./interact.js";
import { getColor, getBelowColor } from "./getcolors.js";

/*-------------------------------- Functions --------------------------------*/

const drawFillTop = (ctx, size, mid, colors, 
    special, count, photo=false, start=0) => {

    const end = start + size;

    ctx.beginPath();
    ctx.moveTo(start, mid);
    ctx.lineTo(mid, end);
    ctx.lineTo(end, mid);
    ctx.lineTo(mid, start);
    ctx.lineTo(start, mid);
    ctx.closePath();

    ctx.fillStyle = getColor(special, colors, "top")
    ctx.fill();
    
    // interaction with cube
    if (special) {

        if (special.link != "mode") {
            redirectCube(special, ctx, start, mid, end, colors, photo, size)
        } else {
            colorMode(special.el, ctx, start, mid, end)
        }

        if (special.icon) {
            if (photo) {
                renderIcon(ctx, special.icon, size, photo)
            } else {
                renderIcon(ctx, special.icon, size)
            }
        }

        textInCube(ctx, colors, mid, special.text, special)

    }

    // else if (count) {
    //     textInCube(ctx, colors, mid, count)
    // }

}



const fillBottomLeft = (ctx, mid, end, colors, special, specialBelow, start=0) => {

    ctx.fillStyle = getColor(special, colors, "right")

    ctx.beginPath();
    ctx.moveTo(start, mid);
    ctx.lineTo(mid, end);
    ctx.lineTo(start, end);
    ctx.closePath();

    ctx.fill();

}



const fillTopRight = (ctx, mid, end, colors, special, specialBelow, start=0) => {

    ctx.fillStyle = getBelowColor(specialBelow, colors, "right")

    ctx.beginPath();
    ctx.moveTo(end, start);
    ctx.lineTo(mid, start);
    ctx.lineTo(end, mid);
    ctx.closePath();

    ctx.fill();
}




const fillBottomRight = (ctx, mid, end, colors, special, specialBelow) => {
    
    ctx.fillStyle = getColor(special, colors, "left")

    ctx.beginPath();
    ctx.moveTo(end, end);
    ctx.lineTo(end, mid);
    ctx.lineTo(mid, end);
    ctx.closePath();
    
    ctx.fill();
}


const fillTopLeft = (ctx, mid, colors, special, specialBelow, start=0) => {

    ctx.fillStyle = getBelowColor(specialBelow, colors, "left")

    ctx.beginPath();
    ctx.moveTo(start, start);
    ctx.lineTo(mid, start);
    ctx.lineTo(start, mid);
    ctx.closePath();
    
    ctx.fill();

}


const fillLeft = (ctx, size, mid, colors, special, specialBelow, start=0) => {

    const end = start + size;

    fillBottomLeft(ctx, mid, end, colors, special, specialBelow);
    fillTopRight(ctx, mid, end, colors, special, specialBelow);

}


const fillRight = (ctx, size, mid, colors, special, specialBelow, start=0) => {

    const end = start + size;

    fillTopLeft(ctx, mid, colors, special, specialBelow)
    fillBottomRight(ctx, mid, end, colors, special, specialBelow)

}

/*-------------------------------- Tile Functions --------------------------------*/

const singleTile = (ctx, size, colors, special, specialBelow, count, photo=false, start=0) => {

    const mid = start + Math.floor(size / 2)

    drawFillTop(ctx, size, mid, colors, special, count, photo)

    fillLeft(ctx, size, mid, colors, special, specialBelow)
    fillRight(ctx, size, mid, colors, special, specialBelow)

}


const halfTile = (ctx, size, colors, alternate=false, count, specialBelow, start=0) => {
    
    const xSize = Math.floor(size / 2)
    const xEnd = start + xSize
    const yMid = Math.floor(size / 2)
    const xMid = Math.floor(xSize / 2)
    const yEnd = start + size

    // right half tile 
    if (alternate) {

        // top corner
        ctx.fillStyle = getBelowColor(specialBelow, colors, "left")

        ctx.beginPath();
        ctx.moveTo(start, start);
        ctx.lineTo(xEnd, start);
        ctx.lineTo(start, yMid);
        ctx.closePath();

        ctx.fill();

        // middle section
        ctx.fillStyle = getColor(false, colors, "top")
        
        ctx.beginPath();
        ctx.moveTo(start, yMid);
        ctx.lineTo(xEnd, start);
        ctx.lineTo(xEnd, yEnd);
        ctx.closePath();
        
        ctx.fill();
        
        // bottom corner
        ctx.fillStyle = getColor(false, colors, "right")
        
        ctx.beginPath();
        ctx.moveTo(start, yMid);
        ctx.lineTo(xEnd, yEnd);
        ctx.lineTo(start, yEnd);
        ctx.closePath();
        
        ctx.fill(); 

    } else {

        // top corner
        ctx.fillStyle = getBelowColor(specialBelow, colors, "right")

        ctx.beginPath();
        ctx.moveTo(start, start);
        ctx.lineTo(xEnd, yMid);
        ctx.lineTo(xEnd, start);
        ctx.closePath();

        ctx.fill();

        // middle section
        ctx.fillStyle = getColor(false, colors, "top")
        
        ctx.beginPath();
        ctx.moveTo(start, start);
        ctx.lineTo(xEnd, yMid);
        ctx.lineTo(start, yEnd);
        ctx.closePath();
        
        ctx.fill();
        
        // bottom corner
        ctx.fillStyle = getColor(false, colors, "left")

        ctx.beginPath();
        ctx.moveTo(xEnd, yMid);
        ctx.lineTo(xEnd, yEnd);
        ctx.lineTo(start, yEnd);
        ctx.closePath();
        
        ctx.fill(); 

    }
    
    // if (count) {
    //     textInCube(ctx, colors, 0, count, false, xMid, yMid)
    // }

}

/*-------------------------------- Exports --------------------------------*/

export { drawFillTop, fillBottomLeft,
    fillTopRight, fillLeft, fillBottomRight, 
    fillTopLeft, fillRight, singleTile, halfTile
}