const drawLine = (ctx, x1, y1, x2, y2, colors, lineWidth=1) => {

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = colors.line;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();

}

const drawFillTop = (ctx, size, mid, start=0, colors, 
    lineWidth=1) => {

    const end = start + size;

    ctx.beginPath();
    ctx.moveTo(start, mid);
    ctx.lineTo(mid, end);
    ctx.lineTo(end, mid);
    ctx.lineTo(mid, start);
    ctx.lineTo(start, mid);
    ctx.strokeStyle = colors.line;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = colors.top;
    ctx.fill();

}

const fillBottomLeft = (ctx, size, mid, end, start=0, colors) => {

    ctx.fillStyle = colors.right;

    ctx.beginPath();
    ctx.moveTo(start, mid);
    ctx.lineTo(mid, end);
    ctx.lineTo(start, end);
    ctx.closePath();

    ctx.fill();

}

const fillTopRight = (ctx, size, mid, end, start=0, colors) => {
    ctx.fillStyle = colors.right;

    ctx.beginPath();
    ctx.moveTo(end, start);
    ctx.lineTo(mid, start);
    ctx.lineTo(end, mid);
    ctx.closePath();

    ctx.fill();
}


const fillBottomRight = (ctx, size, mid, end, start=0, colors) => {
    ctx.fillStyle = colors.left;
    
    ctx.beginPath();
    ctx.moveTo(end, end);
    ctx.lineTo(end, mid);
    ctx.lineTo(mid, end);
    ctx.closePath();
    
    ctx.fill();
}


const fillTopLeft = (ctx, size, mid, end, start=0, colors) => {

    ctx.fillStyle = colors.left;
    
    ctx.beginPath();
    ctx.moveTo(start, start);
    ctx.lineTo(mid, start);
    ctx.lineTo(start, mid);
    ctx.closePath();
    
    ctx.fill();

}

const fillLeft = (ctx, size, mid, start=0, colors) => {

    const end = start + size;
    fillBottomLeft(ctx, size, mid, end, 0, colors);
    fillTopRight(ctx, size, mid, end, 0, colors);

}

const fillRight = (ctx, size, mid, start=0, colors) => {

    const end = start + size;
    fillTopLeft(ctx, size, mid, end, 0, colors)
    fillBottomRight(ctx, size, mid, end, 0, colors)

}

const singleTile = (ctx, size, colors, start=0) => {

    const mid = start + Math.floor(size / 2)
    const end = start + size

    drawFillTop(ctx, size, mid, 0, colors)

    drawLine(ctx, start, start, start, end, colors)
    drawLine(ctx, end, start, end, end, colors)

    fillLeft(ctx, size, mid, 0, colors)
    fillRight(ctx, size, mid, 0, colors)

}


const halfTile = (ctx, size, colors, alternate=false, start=0) => {
    const xSize = Math.floor(size / 2)
    const xEnd = start + xSize
    const yMid = Math.floor(size / 2)
    const yEnd = start + size

    // top
    ctx.fillStyle = colors.right;

    ctx.beginPath();
    ctx.moveTo(start, start);
    ctx.lineTo(xEnd, yMid);
    ctx.lineTo(xEnd, start);
    ctx.closePath();

    ctx.fill();

    // middle
    ctx.fillStyle = colors.top;

    ctx.beginPath();
    ctx.moveTo(start, start);
    ctx.lineTo(xEnd, yMid);
    ctx.lineTo(start, yEnd);
    ctx.closePath();

    ctx.fill();

    // bottom
    ctx.fillStyle = colors.left;

    ctx.beginPath();
    ctx.moveTo(xEnd, yMid);
    ctx.lineTo(xEnd, yEnd);
    ctx.lineTo(start, yEnd);
    ctx.closePath();

    ctx.fill(); 

    // right half tile 
    if (alternate) {

        // top
        ctx.fillStyle = colors.left;

        ctx.beginPath();
        ctx.moveTo(start, start);
        ctx.lineTo(xEnd, start);
        ctx.lineTo(start, yMid);
        ctx.closePath();

        ctx.fill();

        // middle
        ctx.fillStyle = colors.top;

        ctx.beginPath();
        ctx.moveTo(start, yMid);
        ctx.lineTo(xEnd, start);
        ctx.lineTo(xEnd, yEnd);
        ctx.closePath();

        ctx.fill();

        // bottom
        ctx.fillStyle = colors.right;

        ctx.beginPath();
        ctx.moveTo(start, yMid);
        ctx.lineTo(xEnd, yEnd);
        ctx.lineTo(start, yEnd);
        ctx.closePath();

        ctx.fill(); 

    }

}

/*-------------------------------- Exports --------------------------------*/

export { drawLine, drawFillTop, fillBottomLeft,
    fillTopRight, fillLeft, fillBottomRight, 
    fillTopLeft, fillRight, singleTile, halfTile
}