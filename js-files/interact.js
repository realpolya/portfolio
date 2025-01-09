/* cube interactions */

const textInCube = (ctx, colors, font, text, x, y) => {

    ctx.font = font;
    ctx.textAlign = center;
    ctx.textBaseLine = "middle";
    ctx.fillText(text, x, y)

}

export { textInCube }