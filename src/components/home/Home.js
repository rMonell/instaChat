import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import AppContext from '@context/AppContext'

import ChannelInfos from './ChannelInfos'
import Users from './users/Users'
import Screen from './Screen'

const Home = (props) => {
    const context = useContext(AppContext)
    const [screen, setScreen] = useState()

    useEffect(() => {
        const setBodyScreens = (payload) => {
            let screens = []

            for (let i = 0; i < payload.length; i++) {
                if (payload[i].channel === context.app.channel) screens.push(<Screen key={i} socket={props.socket} />)
            }

            setScreen(screens)
        }

        props.socket !== undefined && props.socket.on('new_client', payload => setBodyScreens(payload))
        props.socket !== undefined && props.socket.on('disconnect', payload => setBodyScreens(payload))
        
    }, [props.socket, context.app.channel])

    return (context.user.pseudo === '' || context.app.channel === '') ? <Redirect to="/" /> : (
        <div className="w-100 h-100 flex-column-center position-relative">
            <ChannelInfos channel={context.app.channel} socket={props.socket} />
            <Users channel={context.app.channel} socket={props.socket} />

            <div className="flex-row-centered mbox-rl">{screen}</div>
        </div>
    )
}

export default Home