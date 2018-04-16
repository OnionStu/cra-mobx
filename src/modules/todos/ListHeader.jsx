import React from 'react'
import { Input } from 'antd'

const ListHeader = props => {
  return (
    <div>
      <Input onPressEnter={props.handleAdd} placeholder="Todos" />
    </div>
  )
}

export default ListHeader
