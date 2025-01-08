/*-------------------------------- Constants --------------------------------*/

const lineColor = "grey"
const topColor = "#E0E1DD"
const leftColor = "#778DA9"
const rightColor = "#415A77"

/*-------------------------------- Cached Elements --------------------------------*/

const canvasDiv = document.getElementById('canvases')
const secondCanvasDiv = document.getElementById('secondRow')

/*-------------------------------- Functions --------------------------------*/

const drawLine = (ctx, x1, y1, x2, y2, color="black", lineWidth=1) => {

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();

}

const drawFillTop = (ctx, size, mid, start=0, strColor=lineColor, 
    lineWidth=1, fillColor=topColor) => {

    const end = start + size;

    ctx.beginPath();
    ctx.moveTo(start, mid);
    ctx.lineTo(mid, end);
    ctx.lineTo(end, mid);
    ctx.lineTo(mid, start);
    ctx.lineTo(start, mid);
    ctx.strokeStyle = strColor;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = fillColor;
    ctx.fill();

}

const fillBottomLeft = (ctx, size, mid, end, start=0, fillColor=leftColor) => {
    ctx.fillStyle = fillColor;

    ctx.beginPath();
    ctx.moveTo(start, mid);
    ctx.lineTo(mid, end);
    ctx.lineTo(start, end);
    ctx.closePath();

    ctx.fill();
}

const fillTopRight = (ctx, size, mid, end, start=0, fillColor=leftColor) => {
    ctx.fillStyle = fillColor;

    ctx.beginPath();
    ctx.moveTo(end, start);
    ctx.lineTo(mid, start);
    ctx.lineTo(end, mid);
    ctx.closePath();

    ctx.fill();
}

const fillLeft = (ctx, size, mid, start=0, fillColor=leftColor) => {

    const end = start + size;
    fillBottomLeft(ctx, size, mid, end);
    fillTopRight(ctx, size, mid, end);

}

const fillBottomRight = (ctx, size, mid, end, start=0, fillColor=rightColor) => {
    ctx.fillStyle = fillColor;

    ctx.beginPath();
    ctx.moveTo(end, end);
    ctx.lineTo(end, mid);
    ctx.lineTo(mid, end);
    ctx.closePath();

    ctx.fill();
}


const fillTopLeft = (ctx, size, mid, end, start=0, fillColor=rightColor) => {
    ctx.fillStyle = fillColor;

    ctx.beginPath();
    ctx.moveTo(start, start);
    ctx.lineTo(mid, start);
    ctx.lineTo(start, mid);
    ctx.closePath();

    ctx.fill();
}


const fillRight = (ctx, size, mid, start=0, fillColor=rightColor) => {

    const end = start + size;
    fillTopLeft(ctx, size, mid, end)
    fillBottomRight(ctx, size, mid, end)

}

const singleTile = (ctx, size, start=0) => {

    const mid = start + Math.floor(size / 2)
    const end = start + size

    drawFillTop(ctx, size, mid)

    drawLine(ctx, start, start, start, end)
    drawLine(ctx, end, start, end, end)

    fillLeft(ctx, size, mid)
    fillRight(ctx, size, mid)

}

// TODO:
const leftHalfTile = (ctx, size, alternate=false, start=0) => {
    const xSize = Math.floor(size / 2)
    const xEnd = start + xSize
    const xMid = start + Math.floor(size / 2)
    const yMid = Math.floor(size / 2)

    // top
    ctx.fillStyle = leftColor;

    ctx.beginPath();
    ctx.moveTo(start, start);
    ctx.lineTo(xEnd, yMid);
    ctx.lineTo(xEnd, start);
    ctx.closePath();

    ctx.fill();

}

const createHalfCanvas = (parentEl) => {

    const canvas = document.createElement('canvas');

    canvas.style.backgroundColor = 'thistle';
    canvas.width = 50;
    canvas.height = 100;
    canvas.style.width = '50px';
    canvas.style.height = '100px';

    parentEl.appendChild(canvas);

    const context = canvas.getContext('2d')

    leftHalfTile(context, 100)

}

const createCanvas = (parentEl) => {

    const canvas = document.createElement('canvas');

    canvas.style.backgroundColor = 'thistle';
    canvas.width = 100;
    canvas.height = 100;
    canvas.style.width = '100px';
    canvas.style.height = '100px';

    parentEl.appendChild(canvas);

    const context = canvas.getContext('2d')

    singleTile(context, 100)

}


const createRow = (parentEl, alternate=false) => {

    createCanvas(parentEl)
    createCanvas(parentEl)
    createCanvas(parentEl)

}

/*-------------------------------- Function calls --------------------------------*/

createRow(canvasDiv)

createHalfCanvas(secondCanvasDiv)
createCanvas(secondCanvasDiv)
createCanvas(secondCanvasDiv)
createCanvas(secondCanvasDiv)