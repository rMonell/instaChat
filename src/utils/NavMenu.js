import { createElementWidthClass } from './DomManager'

class NavMenu {
    constructor(target) {
        this.target = target
        this.items = this.target.querySelectorAll('.item')

        this.triggerBuild()
    }

    triggerBuild() {
        this.navTrigger = createElementWidthClass('div', 'nav-trigger')
        this.target.appendChild(this.navTrigger)

        this.init()
    }

    moveTrigger(event) {
        let y = event.target.getBoundingClientRect().y - event.target.getBoundingClientRect().width
        this.navTrigger.style.top = y + 'px'
    }

    init() {
        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i]

            item.addEventListener('click', this.moveTrigger.bind(this))
        }
    }
}

export default NavMenu