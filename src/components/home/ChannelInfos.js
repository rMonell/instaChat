import React, { useEffect, useState } from 'react'
import { MdPerson } from "react-icons/md";

const ChannelInfos = (props) => {
    const [userCount, setUserCount] = useState(0)

    useEffect(() => {
        props.socket !== undefined && props.socket.on('new_client', payload => {
            let initial = 0
            
            for (let i = 0; i < payload.length; i++) {
                if (payload[i].channel === props.channel) {
                    initial++
                    setUserCount(initial)
                }
            }
        })

        props.socket !== undefined && props.socket.on('disconnect', () => setUserCount(prevCount => prevCount - 1))
    }, [props.socket, props.channel])

    return (
        <div className="position-absolute-tl flex-row-center font-m-700 bg-secondary color-secondary-c ph-m pv-s m-l rounded-m">
            <span className="mr-m">{'/' + props.channel}</span>

            <div className="flex-row-center">
                <MdPerson className="mr-s"/>
                <span>{userCount}</span>
            </div>
        </div>
    )
}

export default ChannelInfos