/*-------------------------------- Constants --------------------------------*/

const lineColor = "grey"

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

const fillTop = (ctx, size, mid, start=0) => {

    const end = start + size

    ctx.beginPath();
    ctx.moveTo(start, mid);
    ctx.lineTo(mid, end);
    ctx.lineTo(end, mid);
    ctx.lineTo(mid, start);
    ctx.closePath();

    ctx.fillStyle = "hotpink";
    ctx.fill();

}

const singleTile = (ctx, size, start=0) => {

    const mid = start + Math.floor(size / 2)
    const end = start + size

    drawLine(ctx, start, mid, mid, end)
    drawLine(ctx, start, mid, mid, start)
    drawLine(ctx, mid, start, end, mid)
    drawLine(ctx, mid, end, end, mid)

    drawLine(ctx, start, start, start, end)
    drawLine(ctx, end, start, end, end)

    fillTop(ctx, size, mid)

}


/*-------------------------------- Function calls --------------------------------*/

const canvas = document.createElement('canvas');

canvas.style.backgroundColor = 'thistle';
canvas.width = 100;
canvas.height = 100;
canvas.style.height = '100px';
canvas.style.width = '100px';

canvasDiv.appendChild(canvas);

const context = canvas.getContext('2d')

singleTile(context, 100)
