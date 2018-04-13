import React from 'react'
import { observable, autorun, action } from 'mobx'
import { observer, Observer } from 'mobx-react'
import { Input } from 'antd'

let message = observable({
  title: 'Foo',
  author: {
    name: 'Michel'
  },
  likes: ['John', 'Sara']
})

autorun(() => {
  console.log(message)
  // console.log(message.likes[0])
})

var timerData = observable({
  secondsPassed: 0
})

setInterval(() => {
  action(() => {
    timerData.secondsPassed++
  })()
}, 1000)

const changeValue = action(function(e) {
  console.log(',,,,,,,,,,', e.target.value)

  message.title = e.target.value
})

const Timer = observer(({ timerData }) => (
  <span>Seconds passed: {timerData.secondsPassed} </span>
))

const SomeContainer = ({ title }) => <div>{title()}</div>

const MyComponent = observer(({ message }) => (
  <div>
    <SomeContainer
      title={() => <Observer>{() => <div>{message.title}</div>}</Observer>}
    />
    <Input onChange={changeValue} />
  </div>
))

// export default () => <div>{`${+new Date()} - ${message.title}`}</div>
export default observer(() => (
  <div>
    <Timer timerData={timerData} />
    {`${+new Date()} - ${message.title}`}
    <MyComponent message={message} />
  </div>
))

message.title = 'Bar'

message.likes.push('Jennifer')

changeValue({ target: { value: 'car' } })
