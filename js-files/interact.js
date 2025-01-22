/* cube interactions */

const openCube = (ctx, start, mid, end, colors, special) => {

    let quarter = Math.floor(mid / 2)

    // cavity
    ctx.fillStyle = 'black'

    ctx.beginPath();
    ctx.moveTo(start, mid);
    ctx.lineTo(mid, end);
    ctx.lineTo(mid, mid);
    ctx.lineTo(mid + quarter, mid - quarter);
    ctx.lineTo(mid, start);
    ctx.lineTo(start, mid);
    ctx.closePath();
    ctx.fill();
    
}


const textInCube = (ctx, colors, mid, text, special, x=0, y=0, font="11px Montserrat") => {

    let mode = sessionStorage.getItem("theme");
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
        if (special.project === "mode" && mode === "dark") {
            ctx.fillStyle = colors.line;
        } else if (mode === "dark") {
            ctx.fillStyle = colors[`line${special.project}d`];
        } else {
            ctx.fillStyle = colors[`line${special.project}`];
        }
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
        const y = (size - img.height) / yDivider // TODO: should this be an argument as well

        
        ctx.drawImage(img, x, y, img.width, img.height)

    }

}

const redirectCube = (special, ctx, start, mid, end) => {

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

        // definePath(ctx, start, mid, end)
        // ctx.strokeStyle = 'green'; // Visualize the path
        // ctx.lineWidth = 2;
        // ctx.stroke();
        definePath(ctx, start, mid, end)

        if (ctx.isPointInPath(x, y)) {
            // ctx.fillStyle = "red"
            // ctx.fill()
            // console.log(`Cursor (${x}, ${y}) inside path: ${ctx.isPointInPath(x, y)}`)
            special.el.style.cursor = 'pointer';
            openCube(ctx, start, mid, end)
            // el.classList.add('pointer-cursor');
            // el.classList.remove('default-cursor');
        } else {
            // el.classList.add('default-cursor');
            // el.classList.remove('pointer-cursor');
            special.el.style.cursor = 'default';
        }

        // el.style.cursor = 'pointer';

    })

    special.el.addEventListener('click', (e) => {

        const rect = special.el.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        definePath(ctx, start, mid, end)

        if (ctx.isPointInPath(x, y)) {
            window.location.href = special.link;
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

export { textInCube, renderIcon, redirectCube, colorMode }