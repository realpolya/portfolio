const cubesEl = document.querySelectorAll('.cube')

cubesEl.forEach(cube => {
    cube.style.backgroundColor = "thistle"
})

// try canvas

const canvasEl = document.getElementById('canvas')
const context = canvasEl.getContext('2d')

console.log("context ", context)

const drawLine = (x1, y1, x2, y2, color="black", lineWidth=1) => {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.stroke();
    context.closePath();
}

drawLine(5, 5, 300, 300)