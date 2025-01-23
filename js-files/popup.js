const closeEl = (el, windowEl) => {

    el.addEventListener('click', () => {

        windowEl.style.display = "none"

    })

}

const openEl = (el, windowEl) => {

    el.addEventListener('click', () => {

        windowEl.style.display = "block"

    })

}

export { closeEl, openEl }