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

// // some of the cubes have multiple right and left colors
// const assignColors = (value, colors) => {

//     console.log("value is ", value)

//     if (value === "homi") {
//         console.log("firing homi colors")
//         return {
//             line: colors.lineHomi,
//             top: colors.topHomi,
//             left: colors.leftHomi,
//             right: colors.rightHomi
//         }
//     }

// }

export { textInCube }