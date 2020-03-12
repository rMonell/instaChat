import React from 'react'

const AppContext = React.createContext({
    user: {
        pseudo: '',
        setPseudo: () => {}
    },
    app: {
        channel: '',
        setChannel: () => {}
    }
})

export default AppContext