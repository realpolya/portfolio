/* cube interactions */

const textInCube = (ctx, colors, mid, text, font, x=0, y=0) => {

    ctx.fillStyle = colors.line;
    ctx.font = font;

    if (x && y) {
        ctx.fillText(text, x, y)
    } else {
        ctx.fillText(text, mid, mid)
    }

}

export { textInCube }