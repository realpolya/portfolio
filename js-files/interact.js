/* cube interactions */

const textInCube = (ctx, colors, font, mid, text, x, y) => {

    ctx.fillStyle = colors.line;
    ctx.font = font;
    ctx.textAlign = mid;
    ctx.textBaseLine = "middle";
    ctx.fillText(text, x, y)

}

export { textInCube }