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


/* HALF TILES */

const topPathHalf = (ctx, start, size, alternate) => {

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

/*-------------------------------- Exports --------------------------------*/

export default {
    topPath,
    topRight,
    topPathHalf
}