import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

const ChannelSelection = (props) => {
    const [channel, setChannel] = useState('')
    const [submit, setSubmit] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        props.socket.emit('new_channel', channel)

        setSubmit(true)
    }

    return (!submit) ? (
        <div className="w-100 h-100 flex-column-center">
            <h2 className="font-l-700 text-uppercase mb-m">Choisissez votre canal</h2>
            <form className="flex-row-center" onSubmit={handleSubmit}>
                <span className="mr-m">/</span>
                <input type="text" name="channel" className="textfield rounded w-50" onChange={event => setChannel(event.target.value)} />
            </form>
        </div>
    ) : <Redirect to={'/' + channel}/>
}

export default ChannelSelection