/*-------------------------------- Constants --------------------------------*/

const lineColor = "grey"
const topColor = "hotpink"
const leftColor = "purple"
const rightColor = "aqua"

/*-------------------------------- Cached Elements --------------------------------*/

const canvasDiv = document.getElementById('canvases')

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

const fillLeft = (ctx, size, mid, start=0, fillColor=leftColor) => {

    const end = start + size;
    ctx.fillStyle = fillColor;

    ctx.beginPath();
    ctx.moveTo(start, mid);
    ctx.lineTo(mid, end);
    ctx.lineTo(start, end);
    ctx.closePath();

    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(end, start);
    ctx.lineTo(mid, start);
    ctx.lineTo(end, mid);
    ctx.closePath();

    ctx.fill();

}

const fillRight = (ctx, size, mid, start=0, fillColor=rightColor) => {

    const end = start + size;
    ctx.fillStyle = fillColor;

    ctx.beginPath();
    ctx.moveTo(start, start);
    ctx.lineTo(mid, start);
    ctx.lineTo(start, mid);
    ctx.closePath();

    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(end, end);
    ctx.lineTo(end, mid);
    ctx.lineTo(mid, end);
    ctx.closePath();

    ctx.fill();

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

const createCanvas = (parentEl) => {

    const canvas = document.createElement('canvas');

    canvas.style.backgroundColor = 'thistle';
    canvas.width = 100;
    canvas.height = 100;
    canvas.style.height = '100px';
    canvas.style.width = '100px';

    parentEl.appendChild(canvas);

    const context = canvas.getContext('2d')

    singleTile(context, 100)

}

/*-------------------------------- Function calls --------------------------------*/

createCanvas(canvasDiv)
createCanvas(canvasDiv)
createCanvas(canvasDiv)