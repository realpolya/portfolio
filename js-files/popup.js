const closeEl = (el, windowEl, bodyEl=false) => {

    el.addEventListener('click', () => {

        windowEl.style.display = "none"
        if (bodyEl) {
            bodyEl.style.cursor = "default"
        }

    })

}

const openEl = (el, windowEl) => {

    el.addEventListener('click', () => {

        windowEl.style.display = "block"

    })

}

export { closeEl, openEl }