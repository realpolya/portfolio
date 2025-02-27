const closeEl = (el, windowEl, game=false, funf=false) => {

    el.addEventListener('click', () => {

        windowEl.style.display = "none"
        if (game) {
            sessionStorage.setItem("game", "closed")
            location.reload()
        }
        if (funf) {
            sessionStorage.removeItem("funf")
        }

    })

}

const openEl = (el, windowEl) => {

    el.addEventListener('click', () => {

        windowEl.style.display = "block"

    })

}

export { closeEl, openEl }