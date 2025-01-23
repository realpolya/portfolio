/* contains color functions */


const getColor = (special, colors, cubeSide) => {

    const mode = sessionStorage.getItem("theme");
    let color;

    if (special) {

        if (special.project === "mode" && mode === "dark") {
            color = colors[cubeSide];
        } else if (mode === "dark") {
            color = colors[`${cubeSide}${special.project}d`];
        } else {
            color = colors[`${cubeSide}${special.project}`];
        }

    } else {
        
        if (mode === "dark") {
            color = colors[`${cubeSide}mode`];
        } else {
            color = colors[cubeSide];
        }
    }

    return color;

}


const getBelowColor = (specialBelow, colors, cubeSide) => {

    const mode = sessionStorage.getItem("theme");
    let color;

    if (specialBelow[0] === cubeSide) {
        if (mode === "dark" && specialBelow[1] === "mode") {
            color = colors[cubeSide];
        } else if (mode === "dark") {
            color = colors[`${cubeSide}${specialBelow[1]}d`];
        } else {
            color = colors[`${cubeSide}${specialBelow[1]}`];
        }
    } else if (specialBelow[2] === cubeSide) {
        if (mode === "dark") {
            color = colors[`${cubeSide}${specialBelow[3]}d`];
        } else {
            color = colors[`${cubeSide}${specialBelow[3]}`];
        }
    } else {
        if (mode === "dark") {
            color = colors[`${cubeSide}mode`];
        } else {
            color = colors[cubeSide];
        }
    }

    return color;

}

/*-------------------------------- Exports --------------------------------*/

export { getColor, getBelowColor }