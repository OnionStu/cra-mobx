import React from 'react'
import { Button, Radio, Row, Col } from 'antd'
import { observer } from 'mobx-react'

const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const ButtonGroup = Button.Group

const ListFooter = observer(props => {
  return (
    <Row>
      <Col span={6} className="text-left">
        <div>待办数量: {props.todos.todosCount}</div>
      </Col>
      <Col span={12} className="text-center">
        <RadioGroup
          onChange={props.handleTypeChange}
          value={props.todos.listType}
        >
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="todo">待办</RadioButton>
          <RadioButton value="done">已办</RadioButton>
        </RadioGroup>
      </Col>
      <Col span={6} className="text-right">
        <ButtonGroup>
          <Button type="default" onClick={props.handleClear}>
            Clear Finished
          </Button>
          <Button type="primary" onClick={props.fetchList}>
            Fetch
          </Button>
        </ButtonGroup>
      </Col>
    </Row>
  )
})

export default ListFooter
