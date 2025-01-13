/* cube interactions */

const textInCube = (ctx, colors, mid, text, font, x=0, y=0) => {

    console.log('text is ', text)
    ctx.fillStyle = "red";
    // ctx.fillStyle = colors.line;
    ctx.font = font;
    // ctx.textAlign = mid;
    // ctx.textBaseLine = "middle";

    if (x && y) {
        console.log("creating text for ", x, y)
        ctx.fillText(text, x, y)
    } else {
        ctx.fillText(text, mid, mid)
    }

}

export { textInCube }