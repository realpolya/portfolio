/*-------------------------------- Constants --------------------------------*/

const lineColor = "grey"

/*-------------------------------- Cached Elements --------------------------------*/

const canvasEl = document.getElementById('canvas')
const canvasDiv = document.getElementById('canvases')

/*-------------------------------- Functions --------------------------------*/

const context = canvasEl.getContext('2d')

const drawLine = (ctx, x1, y1, x2, y2, color="black", lineWidth=1) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();
}

const singleTile = (ctx) => {
    drawLine(ctx, 5, 5, 500, 300)
}

/*-------------------------------- Function calls --------------------------------*/

drawLine(context, 5, 5, 500, 300)

const canvas2 = document.createElement('canvas');
canvas2.style.backgroundColor = lineColor;
canvas2.style.height = '100px';
canvas2.style.width = '100px';
canvasDiv.appendChild(canvas2);
const context2 = canvas2.getContext('2d')

singleTile(context2)
