const closeEl = (el, windowEl, game=false) => {

    el.addEventListener('click', () => {

        windowEl.style.display = "none"
        if (game) {
            sessionStorage.setItem("game", "closed")
            location.reload()
        }

    })

}

const openEl = (el, windowEl) => {

    el.addEventListener('click', () => {

        windowEl.style.display = "block"

    })

}

export { closeEl, openEl }