const closeEl = (el, windowEl) => {

    el.addEventListener('click', () => {

        windowEl.style.display = "none"

    })

}

export { closeEl }