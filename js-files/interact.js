/* cube interactions */

const textInCube = (ctx, colors, mid, text, special, x=0, y=0, font="11px Montserrat") => {

    let extraXConst = 2.8

    if (mid < 80) {
        font = "10px Montserrat"
    } else if (mid > 100) {
        font = "13px Montserrat"
        extraXConst = 3.5
    }


    let textLength;
    let extraX = 0
    let extraX2 = 0
    let text1;
    let text2;

    if (typeof(text) === "string") {
        textLength = text.split("").length
        extraX += textLength
        extraX *= extraXConst

        let words = text.split(" ")
        if (words.length >= 3) {

            text1 = `${words[0]} ${words[1]}`
            text2 = words[2]

            textLength = text1.split("").length
            extraX = 0
            extraX += textLength
            extraX *= extraXConst

            textLength = text2.split("").length
            extraX2 += textLength
            extraX2 *= extraXConst

        }

    }


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
        if (text1) {
            ctx.fillText(text1, mid - extraX, mid - 0.2 * mid) // this formula can be changed
            ctx.fillText(text2, mid - extraX2, 12 + mid - 0.2 * mid)
        } else {
            ctx.fillText(text, mid - extraX, mid - 0.2 * mid) // this formula can be changed
        }
    }

}


const renderIcon = (ctx, source, size) => {

    const img = new Image();
    img.src = source

    img.onload = () => {

        img.width = size / 4
        img.height = size / 4

        const x = (size - img.width) / 2
        const y = (size - img.height) / 1.4 // TODO: should this be an argument as well
        
        ctx.drawImage(img, x, y, img.width, img.height)

    }

}

const redirectCube = (el, link) => {
    el.addEventListener('mouseenter', () => {
        el.style.cursor = 'pointer';
    })
    el.addEventListener('click', () => {
        window.location.href = link;
    })
}

export { textInCube, renderIcon, redirectCube }