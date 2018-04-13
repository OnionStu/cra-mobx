import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'mobx-react'
import stores from './stores'
import routes from './routes'

const App = () => {
  return (
    <Router>
      <Provider {...stores}>{routes}</Provider>
    </Router>
  )
}

export default App
