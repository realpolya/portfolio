/* cube interactions */

const textInCube = (ctx, colors, mid, text, font, x=0, y=0) => {

    ctx.fillStyle = colors.line;
    ctx.font = font;
    ctx.textAlign = mid;
    ctx.textBaseLine = "middle";
    ctx.fillText(text, mid, mid)

    if (x && y) {
        ctx.fillText(text, x, y)
    }

}

export { textInCube }