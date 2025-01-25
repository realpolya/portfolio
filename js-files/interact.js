/* cube interactions */
/*-------------------------------- Imports --------------------------------*/

import { getColor, getBelowColor } from "./getcolors.js";

/*-------------------------------- Functions --------------------------------*/

const openCube = (ctx, start, mid, end, colors, special) => {

    const quarter = Math.floor(mid / 2)
    const mode = sessionStorage.getItem("theme")

    // cavity
    ctx.fillStyle = colors[`cavity${special.project}`]

    ctx.beginPath();
    ctx.moveTo(start, mid);
    ctx.lineTo(mid, end);
    ctx.lineTo(mid, mid);
    ctx.lineTo(mid + quarter, mid - quarter);
    ctx.lineTo(mid, start);
    ctx.lineTo(start, mid);
    ctx.closePath();
    ctx.fill();

    // bottom half open
    ctx.fillStyle = getColor(special, colors, "left")

    ctx.beginPath();
    ctx.moveTo(mid, end);
    ctx.lineTo(end, mid);
    ctx.lineTo(end, start);
    ctx.lineTo(mid, mid);
    ctx.lineTo(mid, end);
    ctx.closePath();
    ctx.fill();

    // corner
    ctx.fillStyle = colors[`top${special.project}d`];

    ctx.beginPath();
    ctx.moveTo(start, start);
    ctx.lineTo(start, mid);
    ctx.lineTo(mid, start);
    ctx.lineTo(start, start);
    ctx.closePath();
    ctx.fill();

    // corner of another canvas
    let animCtx = document.getElementById(special.idEl).getContext('2d')
    animCtx.fillStyle = colors[`top${special.project}d`];
    animCtx.fill()
    
}


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

    ctx.fillStyle = getColor(special, colors, "line")
    ctx.font = font;

    // for custom x and y positioning
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


const renderIcon = (ctx, source, size, photo=false) => {

    const img = new Image();
    img.src = source

    img.onload = () => {
        
        let yDivider = 1.4

        if (photo) {
            img.width = size / 1.5
            img.height = size / 1.5
            yDivider = 2
        } else {
            img.width = size / 4
            img.height = size / 4
        }

        const x = (size - img.width) / 2
        const y = (size - img.height) / yDivider

        
        ctx.drawImage(img, x, y, img.width, img.height)

    }

}


const restoreCube = (special, ctx, mid, colors, photo, size) => {

    if (special.icon) {
        if (photo) {
            renderIcon(ctx, special.icon, size, photo)
        } else {
            renderIcon(ctx, special.icon, size)
        }
    }
    textInCube(ctx, colors, mid, special.text, special)

}


const redirectCube = (special, ctx, start, mid, end, colors, photo, size) => {

    const mode = sessionStorage.getItem("theme")

    const definePath = (ctx, start, mid, end) => {
        ctx.beginPath();
        ctx.moveTo(start, mid);
        ctx.lineTo(mid, end);
        ctx.lineTo(end, mid);
        ctx.lineTo(mid, start);
        ctx.lineTo(start, mid);
        ctx.closePath();
    }
    
    special.el.addEventListener('mousemove', (e) => {

        const rect = special.el.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        definePath(ctx, start, mid, end)

        if (special.project !== "funf") {
            if (ctx.isPointInPath(x, y)) {
                
                special.el.style.cursor = 'pointer';
                ctx.fillStyle = getColor(false, colors, "hover")
                
    
            } else {
    
                special.el.style.cursor = 'default';
                ctx.fillStyle = getColor(special, colors, "top")
                
    
            }

            ctx.fill()
            restoreCube(special, ctx, mid, colors, photo, size)
        }

    })

    special.el.addEventListener('click', (e) => {

        const rect = special.el.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        definePath(ctx, start, mid, end)

        if (ctx.isPointInPath(x, y)) {
            if (special.project === "funf") {
                openCube(ctx, start, mid, end, colors, special)
                const funFactEl = document.getElementById('div-funfact')
                funFactEl.style.display = "block"
            } else if (special.project === "game") {
                const gameEl = document.getElementById('div-colorgame')
                const paletteButton = document.getElementById('button-palette')
                gameEl.style.display = "block"
                paletteButton.style.display = "block"
            } else {
                window.location.href = special.link;
            }
        }

    })
}


const colorMode = (el, ctx, start, mid, end) => {


    const definePath = (ctx, start, mid, end) => {
        ctx.beginPath();
        ctx.moveTo(start, mid);
        ctx.lineTo(mid, end);
        ctx.lineTo(end, mid);
        ctx.lineTo(mid, start);
        ctx.lineTo(start, mid);
        ctx.closePath();
    }
    

    el.addEventListener('mousemove', (e) => {

        const rect = el.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        definePath(ctx, start, mid, end)

        if (ctx.isPointInPath(x, y)) {
            el.style.cursor = 'pointer';
        } 

    })


    el.addEventListener('click', (e) => {

        const rect = el.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        definePath(ctx, start, mid, end)

        if (ctx.isPointInPath(x, y)) {
            if (sessionStorage.getItem("theme") === "light") {
                sessionStorage.setItem("theme", "dark");
            } else {
                sessionStorage.setItem("theme", "light");
            }
            window.location.reload()
        }

    })

}

/*-------------------------------- Exports --------------------------------*/

export { textInCube, renderIcon, redirectCube, colorMode }