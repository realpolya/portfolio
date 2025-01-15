/* cube interactions */

const textInCube = (ctx, colors, mid, text, special, x=0, y=0, font="Montserrat") => {

    if (special) {
        let concat = `line${special.project}`
        ctx.fillStyle = colors[concat];
    } else {
        ctx.fillStyle = colors.line;
    }
    ctx.font = font;

    if (x && y) {
        ctx.fillText(text, x, y)
    } else {
        ctx.fillText(text, mid, mid)
    }

}

const renderIcon = (ctx, source, size) => {

    const img = new Image();
    img.src = source

    img.onload = () => {

        img.width = size / 3
        img.height = size / 3

        const imgWidth = img.width
        const imgHeight = img.height

        const x = (size - img.width) / 2
        const y = (size - img.height) / 2
        
        ctx.drawImage(img, x, y)

    }

}

export { textInCube, renderIcon }