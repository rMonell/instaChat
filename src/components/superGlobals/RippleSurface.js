import React, {useRef, useEffect} from 'react'

import Ripple from '@utils/Ripple'

const RippleSurface = (props) => {
    const target = useRef()

    const datas = {
        type: (props.type === undefined) ? 'div' : props.type,
        mode: (props.mode === undefined) ? 'light' : props.mode,
        className: (props.className === undefined) ? '' : props.className,
    }

    const rippleClassName = 'md-surface ' + datas.mode + ' ' + datas.className

    const el = (props.transfer) ?
    React.cloneElement(
        props.children,
        {className: props.children.props.className + ' ' + rippleClassName, ref: target}
    ) :
    <datas.type ref={target} className={rippleClassName} onClick={props.onClick}>{props.children}</datas.type>

    useEffect(() => {
        new Ripple(target.current)
    }, [])

    return <> {el} </>
}

export default RippleSurface
