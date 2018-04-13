import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './common/basic.css'
import { configure } from 'mobx'

// 开启 mobx strict模式
// mobx.useStrict(true) //mobx 3.x
configure({ enforceActions: true }) // mobx 4.x

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
