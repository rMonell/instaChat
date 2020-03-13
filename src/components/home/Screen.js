import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'

const Video = styled.video`
    background-color: #ccc;
    width: 100%;
    max-width: 980px;
`

const Screen = (props) => {
    const streamScreen = useRef()

    useEffect(() => {
        const stream = (screen) => {
            let constraints = { audio: true, video: true }

            navigator.getUserMedia(constraints, stream => {
                screen.srcObject = stream

                const pc = new RTCPeerConnection()
                const tracks = stream.getTracks()

                pc.ontrack = event => {
                    console.log('ok')
                    props.socket.emit('stream', event.stream)
                }

                tracks.forEach(track => pc.addTrack(track))
                
                screen.onloadedmetadata = () => screen.play()
            }, error => console.log(error))
        }

        streamScreen.current !== undefined && stream(streamScreen.current)

    }, [props.socket])

    return <Video ref={streamScreen} />
}

export default Screen