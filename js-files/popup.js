const closeEl = (el, windowEl) => {

    el.addEventListener('click', () => {

        windowEl.style.display = "none"

    })

}

const openEl = (el, windowEl) => {

    el.addEventListener('click', () => {

        windowEl.style.display = "block"

    })

    // el.addEventListener('mouseover', () => {

    //     el.style.backgroundColor = "blue"

    // })

}

export { closeEl, openEl }