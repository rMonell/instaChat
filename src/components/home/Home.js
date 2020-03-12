import React, { useRef, useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import AppContext from '@context/AppContext'

const Home = (props) => {
    const context = useContext(AppContext)
    const streamScreen = useRef()

    useEffect(() => {
        const stream = (screenRef) => {
            navigator.getUserMedia({video: true, audio: true}, stream => {
                screenRef.srcObject = stream
                screenRef.onloadedmetadata = event => screenRef.play()
            }, error => console.log(error))
        }

        streamScreen.current !== undefined && stream(streamScreen.current)
    }, [props.socket])

    return (context.user.pseudo === '' || context.app.channel === '') ? <Redirect to="/" /> : (
        <div className="w-100 h-100 flex-column-center position-relative">
            <div className="position-absolute-tl p-l flex-row-between-center w-100">
                <span className="font-m-700 bg-primary color-primary-c ph-m pv-s rounded-m">{context.app.channel}</span>
                <span className="font-m-700 color-primary">{context.user.pseudo}</span>
            </div>
            

            <video ref={streamScreen}></video>
        </div>
    )
}

export default Home