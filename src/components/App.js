import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import openSocket from "socket.io-client"

import ChannelSelection from './auth/ChannelSelection'
import Home from './home/Home'

import AppContext from '@context/AppContext'

const App = () => {
  const [socket, setSocket] = useState()

  const [channel, setChannel] = useState('')
  const [pseudo, setPseudo] = useState('')

  const store = {
    user: {
      pseudo: pseudo,
      setPseudo: (pseudo) => setPseudo(pseudo)
    },
    app: {
      channel: channel,
      setChannel: (channel) => setChannel(channel)
    }
  }

  useEffect(() => setSocket(openSocket(process.env.REACT_APP_HOST + ':' + process.env.REACT_APP_PORT)), [])

  return (
    <AppContext.Provider value={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={() => <ChannelSelection socket={socket} />} />
          <Route path="/:channel" component={() => <Home socket={socket} />} />
        </Switch>
      </Router>
    </AppContext.Provider>
  )
}

export default App
