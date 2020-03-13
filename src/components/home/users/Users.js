import React, { useEffect, useState } from 'react'
import UserContainer from './UserContainer'

const Users = (props) => {
    const [users, setUsers] = useState([])
    
    useEffect(() => {
        const setBodyUsers = (payload) => {
            let users = []

            for (let i = 0; i < payload.length; i++) {
                if (payload[i].channel === props.channel) {
                    users.push(<UserContainer pseudo={payload[i].pseudo} key={i} />)
                }
            }

            setUsers(users)
        }

        props.socket !== undefined && props.socket.on('new_client', payload => setBodyUsers(payload))
        props.socket !== undefined && props.socket.on('disconnect', payload => setBodyUsers(payload))
        
    }, [props.socket, props.channel])

    return (
        <div className="position-absolute-tr m-l mbox-bm">
            {users}
        </div>
    )
}

export default Users