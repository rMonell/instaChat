import { classToggler } from './ClassManager'

export const createElementWidthClass = (tagName, className) => {
    let el = document.createElement(tagName)
    el.classList.add(className)

    return el
}

export const css = (el, styles) => {
    let cssString = ''

    for (let style in styles) {
        cssString += style + ': ' + styles[style] + ';'
    }

    return el.style.cssText = cssString
}

export const addEvents = (el, events = {}) => {
   if (typeof el === 'string') {
        let els = document.querySelectorAll(el)

        for (var i = 0; i < els.length; i++) {
            for (let event in events) {
                let callback = events[event]
                els[i].addEventListener(event, callback)
            }
        }
    } else {
        for (let event in events) {
            let callback = events[event]
            event = event.split(',')

            for (let oneEvent of event) {
                el.addEventListener(oneEvent.trim(), callback)
            }
        }
    }
}

export const toggleMenu = (menu) => {
    let body = document.querySelector('body')
    let menuIcon = menu.firstChild

    classToggler(menu, 'is-open')
    
    menuIcon.addEventListener("click", () => {
        classToggler(menu, 'is-open')
    })

    body.addEventListener("keydown", (event) => {
        if (event.keyCode === 27)  menu.classList.remove('is-open')
    })
}

export const openSubmenu = () => {
    classToggler('.app-layout', 'submenu-open')
}