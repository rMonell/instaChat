export const classToggler = (target, className, callback) => {

    if (typeof target === 'string') target = document.querySelector(target)

    if (!target.classList.contains(className)) {
        target.classList.add(className)

        if (callback !== undefined) callback()
    } else {
        target.classList.remove(className)
    }
}