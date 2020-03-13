import React, { useEffect, useState, useContext } from 'react'
import AppContext from '@context/AppContext'

const UserContainer = (props) => {
    const context = useContext(AppContext)
    const [color, setColor] = useState()

    useEffect(() => (props.pseudo === context.user.pseudo) ? setColor('primary') : setColor('secondary'), [props.pseudo, context.user.pseudo])

    return (
        <div color={color} className={'bg-' + color + ' color-' + color + '-c ph-m pv-s rounded-m'}>
            <span className="font-l-700">{props.pseudo[0].toUpperCase()}</span>
        </div>
    )
}

export default UserContainer