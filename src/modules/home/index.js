import React, { Component } from 'react'
import { Button } from 'antd'
import { observer, inject } from 'mobx-react'
import logo from './logo.svg'
import './home.less'
import { withRouter } from 'react-router'

@withRouter
@inject('home')
@observer
class App extends Component {
  render() {
    const { count, msg } = this.props.home
    // console.log(this);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>frame framework</div>
        <div>Msg: {msg}</div>
        <div>Count: {count}</div>
        <Button
          type="primary"
          onClick={() => {
            this.props.home.add()
          }}
        >
          点击
        </Button>
        <Button
          onClick={() => {
            this.props.history.push('/todos')
          }}
        >
          Go Todos
        </Button>
      </div>
    )
  }
}

export default App
