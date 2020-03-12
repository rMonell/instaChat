import { createElementWidthClass, css, addEvents } from './DomManager'

class Ripple {
    constructor(DOMElements) {
        this.getDOMElements(DOMElements)
        this.start = 0
        this.delay = 500

        this.DOMInit()
    }

    getRippleDatas(event, target, ripple) {
        const box = target.getBoundingClientRect()
        const absolutePointerPosition = Math.abs(event.clientX - box.x - (box.width / 2)) * 2

        let rippleSize = (box.height > box.width) ? (box.height * 1.8) + absolutePointerPosition : (box.width * 1.8) + absolutePointerPosition

        const x = event.clientX - box.x
        const y = event.clientY - box.y

        css(ripple, {
            'opacity': '.15',
            'width': rippleSize + 'px',
            'height': rippleSize + 'px',
            'top': y + 'px',
            'left': x + 'px'
        })
    }

    rippleBuild(event) {
        let childRipples = event.target.querySelectorAll('.ripple')

        if (childRipples.length > 0) this.rippleDestroy('now', 1, event)

        const ripple = createElementWidthClass('span', 'ripple')
        const target = event.target

        this.start = Date.now()

        target.appendChild(ripple)

        this.getRippleDatas(event, target, ripple)
    }

    rippleDestroy(mode, index, event) {
        const ripple = event.target.querySelectorAll('.md-surface .ripple')
        const end = Date.now() - this.start

        var delay = (end > this.delay || mode !=='default') ? 0 : (this.delay - end)

        for (let i = index; i < ripple.length; i++) {
            setTimeout(() => {
                ripple[i].style.opacity = '0'
            }, delay)

            setTimeout(() => { ripple[i].remove() }, (delay + this.delay))
        }
    }

    getDOMElements(DOMElements) {
        try {
            this.DOMElements = document.querySelectorAll(DOMElements)
        } catch (e) {
            this.DOMElements = DOMElements
        }
    }

    DOMInit() {
        if (this.DOMElements.length !== undefined) {
            for (let i = 0; i < this.DOMElements.length; i++) {
                let DOMElement = this.DOMElements[i]

                addEvents(DOMElement, {
                    'mousedown': this.rippleBuild.bind(this),
                    'mouseup, mouseleave': this.rippleDestroy.bind(this, 'default', 0)
                })
            }
        } else {
            addEvents(this.DOMElements, {
                'mousedown': this.rippleBuild.bind(this),
                'mouseup, mouseleave': this.rippleDestroy.bind(this, 'default', 0)
            })
        }
    }
}

export default Ripple

export const useRipple = (refs) => {
    if (refs.target !== undefined) {
        new Ripple(refs.target)
    } else {
        for (let ref of refs) {
            new Ripple(ref)
        }
    }
}