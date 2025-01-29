/* define paths for clicking and coloring */


const topPath = (ctx, start, mid, end) => {

    ctx.beginPath();
    ctx.moveTo(start, mid);
    ctx.lineTo(mid, end);
    ctx.lineTo(end, mid);
    ctx.lineTo(mid, start);
    ctx.lineTo(start, mid);
    ctx.closePath();
    
}


const topRight = (ctx, start, mid, end) => {

    ctx.beginPath();
    ctx.moveTo(end, start);
    ctx.lineTo(mid, start);
    ctx.lineTo(end, mid);
    ctx.closePath();

}


const topLeft = (ctx, start, mid, end) => {

    ctx.beginPath();
    ctx.moveTo(start, start);
    ctx.lineTo(mid, start);
    ctx.lineTo(start, mid);
    ctx.closePath();

}


const bottomRight = (ctx, start, mid, end) => {
    
    ctx.beginPath();
    ctx.moveTo(end, end);
    ctx.lineTo(end, mid);
    ctx.lineTo(mid, end);
    ctx.closePath();
    
}


const bottomLeft = (ctx, start, mid, end) => {

    ctx.beginPath();
    ctx.moveTo(start, mid);
    ctx.lineTo(mid, end);
    ctx.lineTo(start, end);
    ctx.closePath();

}


/* HALF TILES */


const centerHalf = (ctx, start, size, alternate) => {

    const xSize = Math.floor(size / 2)
    const xEnd = start + xSize
    const yMid = Math.floor(size / 2)
    const yEnd = start + size

    // right half tile
    if (alternate) {
        ctx.beginPath();
        ctx.moveTo(start, yMid);
        ctx.lineTo(xEnd, start);
        ctx.lineTo(xEnd, yEnd);
        ctx.closePath();
    } // left half tile
    else {
        ctx.beginPath();
        ctx.moveTo(start, start);
        ctx.lineTo(xEnd, yMid);
        ctx.lineTo(start, yEnd);
        ctx.closePath();
    }

}


const topHalf = (ctx, start, size, alternate) => {

    const xSize = Math.floor(size / 2)
    const xEnd = start + xSize
    const yMid = Math.floor(size / 2)
    const yEnd = start + size

    if (alternate) {
        ctx.beginPath();
        ctx.moveTo(start, start);
        ctx.lineTo(xEnd, start);
        ctx.lineTo(start, yMid);
        ctx.closePath();
    }
    else {
        ctx.beginPath();
        ctx.moveTo(start, start);
        ctx.lineTo(xEnd, yMid);
        ctx.lineTo(xEnd, start);
        ctx.closePath();
    }

}


const bottomHalf = (ctx, start, size, alternate) => {

    const xSize = Math.floor(size / 2)
    const xEnd = start + xSize
    const yMid = Math.floor(size / 2)
    const yEnd = start + size

    if (alternate) {
        ctx.beginPath();
        ctx.moveTo(start, yMid);
        ctx.lineTo(xEnd, yEnd);
        ctx.lineTo(start, yEnd);
        ctx.closePath();
    }
    else {
        ctx.beginPath();
        ctx.moveTo(xEnd, yMid);
        ctx.lineTo(xEnd, yEnd);
        ctx.lineTo(start, yEnd);
        ctx.closePath();
    }

}



/*-------------------------------- Exports --------------------------------*/

export default {

    topPath, // i = 0
    topRight, // i = 1
    topLeft, // i = 2
    bottomRight, // i = 3
    bottomLeft, // i = 4

    centerHalf, // i = 5
    topHalf, // i = 6
    bottomHalf // i = 7

}