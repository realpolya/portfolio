/*-------------------------------- Constants --------------------------------*/

const lineColor = "grey"

/*-------------------------------- Cached Elements --------------------------------*/

const cubesEl = document.querySelectorAll('.cube')
const canvasEl = document.getElementById('canvas')
const canvasDiv = document.getElementById('canvases')

/*-------------------------------- Functions --------------------------------*/

cubesEl.forEach(cube => {
    cube.style.backgroundColor = "thistle"
})

// try canvas

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

/*-------------------------------- Function calls --------------------------------*/

drawLine(context, 5, 5, 500, 300)

const canvas2 = document.createElement('canvas');
canvas2.style.backgroundColor = lineColor;
canvasDiv.appendChild(canvas2);
const context2 = canvas2.getContext('2d')

drawLine(context2, 5, 5, 500, 300)
