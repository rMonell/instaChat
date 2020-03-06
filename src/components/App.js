import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import socketIOClient from "socket.io-client"

import ChannelSelection from './auth/ChannelSelection'

const App = () => {
  const [socket, setSocket] = useState()

  useEffect(() => {
    const host = '127.0.0.1'
    const port = '8080'

    setSocket(socketIOClient(host + ':' + port))
  }, [])

  return (
    <Router>
      <Route exactPath="/" component={() => <ChannelSelection socket={socket} />} />
    </Router>
  )
}

export default App;
