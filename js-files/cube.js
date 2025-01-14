/* contain cube geometry */
import { textInCube } from "./interact.js";


const drawLine = (ctx, x1, y1, x2, y2, colors, lineWidth=1) => {

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = colors.line;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();

}

const drawFillTop = (ctx, size, mid, colors, 
    special, count, start=0, lineWidth=1) => {

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

    if (special) {
        let concat = `top${special.project}`
        ctx.fillStyle = colors[concat];
    } else {
        ctx.fillStyle = colors.top;
    }

    ctx.fill();
    
    if (count) {
        textInCube(ctx, colors, mid, count, "Montserrat")
    }

}

const fillBottomLeft = (ctx, mid, end, colors, special, specialBelow, start=0) => {

    if (special) {
        let concat = `right${special.project}`
        ctx.fillStyle = colors[concat];
    } else {
        ctx.fillStyle = colors.right;
    }
    ctx.beginPath();
    ctx.moveTo(start, mid);
    ctx.lineTo(mid, end);
    ctx.lineTo(start, end);
    ctx.closePath();

    ctx.fill();

}

const fillTopRight = (ctx, mid, end, colors, special, specialBelow, start=0) => {
    
    if (specialBelow[0] === "right") {
        let concat = `right${specialBelow[1]}`
        ctx.fillStyle = colors[concat];
    } else {
        ctx.fillStyle = colors.right;
    }
    ctx.beginPath();
    ctx.moveTo(end, start);
    ctx.lineTo(mid, start);
    ctx.lineTo(end, mid);
    ctx.closePath();

    ctx.fill();
}


const fillBottomRight = (ctx, mid, end, colors, special, specialBelow) => {

    if (special) {
        let concat = `left${special.project}`
        ctx.fillStyle = colors[concat];
    } else {
        ctx.fillStyle = colors.left;
    }
    // ctx.fillStyle = colors.left;
    ctx.beginPath();
    ctx.moveTo(end, end);
    ctx.lineTo(end, mid);
    ctx.lineTo(mid, end);
    ctx.closePath();
    
    ctx.fill();
}


const fillTopLeft = (ctx, mid, colors, special, specialBelow, start=0) => {

    console.log("special is ", special)
    // special is not being passed because the tile itself is normal

    if (specialBelow[0] === "left") {
        let concat = `left${specialBelow[1]}`
        ctx.fillStyle = colors[concat];
    } else {
        ctx.fillStyle = colors.left;
    }
    
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


const singleTile = (ctx, size, colors, special, specialBelow, count, start=0) => {

    const mid = start + Math.floor(size / 2)
    const end = start + size


    drawFillTop(ctx, size, mid, colors, special, count)

    drawLine(ctx, start, start, start, end, colors)
    drawLine(ctx, end, start, end, end, colors)

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

        // top
        if (specialBelow === "left") {
            ctx.fillStyle = colors.leftHomi;
        } else {
            ctx.fillStyle = colors.left;
        }

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

    } else {
        // top
        if (specialBelow === "right") {
            ctx.fillStyle = colors.rightHomi;
        } else {
            ctx.fillStyle = colors.right;
        }

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

    }
    
    if (count) {
        textInCube(ctx, colors, 0, count, "Montserrat", xMid, yMid)
    }

}

/*-------------------------------- Exports --------------------------------*/

export { drawLine, drawFillTop, fillBottomLeft,
    fillTopRight, fillLeft, fillBottomRight, 
    fillTopLeft, fillRight, singleTile, halfTile
}