import React from 'react'

import RippleSurface from './RippleSurface'
import Spinner from './Spinner'

const Button = (props) => {

    const dataFilter = {
        importance: (props.importance) ? 'button-' + props.importance : 'button',
        className: (props.className) ? props.className : '',
        type: (props.type) ? props.type : '',
        text: (props.text) ? props.text : 'Button',
        waiting: (props.waiting) ? 'waiting' : ''
    }

    const buttonClassName = dataFilter.importance
    + ' '
    + dataFilter.className
    + ' '
    + dataFilter.waiting

    return (
        <RippleSurface mode="dark" transfert>
            <button
                className={buttonClassName}
                type={dataFilter.type}
                onClick={props.onClick}>
                {props.icon && <props.icon />}
                {(props.waiting) ? <Spinner /> : <span>{dataFilter.text}</span>}
            </button>
        </RippleSurface>
    )
}

export default Button