import React, { useRef, useContext } from 'react'
import { useHistory } from "react-router-dom";
import AppContext from '@context/AppContext'

import Button from '@superGlobals/Button'

const ChannelSelection = (props) => {
    const context = useContext(AppContext)
    
    let channel = useRef()
    let channelLabel = useRef()

    let pseudo = useRef()
    let pseudoLabel = useRef()

    let history = useHistory()

    const handleSubmit = (event) => {
        event.preventDefault()

        inputChecker(channel, channelLabel)
        inputChecker(pseudo, pseudoLabel)

        if (pseudo.current.value !== '' && channel.current.value !== '') {
            context.user.setPseudo(pseudo.current.value)
            context.app.setChannel(channel.current.value)
    
            props.socket.emit('new_channel', context.app.channel)
            props.socket.emit('new_client', {pseudo: context.user.pseudo, channel: context.app.channel})
    
            history.push('/' + channel.current.value)
        }
    }

    const inputChecker = (inputRef, labelRef) => {
        let input = inputRef.current
        let label = labelRef.current

        if (input.value === '') {
            input.classList.add('error')
            label.classList.add('color-alert')
        }
        
        if (input.value !== '' && input.classList.contains('error')) {
            input.classList.remove('error')
            label.classList.remove('color-alert')
        }
    }

    return (
        <div className="w-100 h-100 flex-row-center">
            <form onSubmit={handleSubmit}>
                <h1 className="font-l-700 mb-m text-center">Rejoindre un salon</h1>
                <div className="flex-column mb-m">
                    <label htmlFor="pseudo" ref={channelLabel} className="mb-s text-left font-700">Salon</label>
                    <div className="flex-row-center">
                        <span className="mr-m">/</span>
                        <input
                            type="text"
                            name="channel"
                            className="textfield w-100"
                            ref={channel}
                            onChange={() => inputChecker(channel, channelLabel)}
                        />
                    </div>
                </div>
                <div className="flex-column mb-m">
                    <label htmlFor="pseudo" ref={pseudoLabel} className="mb-s text-left font-700">Pseudo</label>
                    <input
                        type="text"
                        name="pseudo"
                        className="textfield w-100"
                        ref={pseudo}
                        onChange={() => inputChecker(pseudo, pseudoLabel)}
                    />
                </div>

                <Button type="submit" importance="primary" text="Entrer dans le salon" className="w-100" />
            </form>
        </div>
    ) 
}

export default ChannelSelection