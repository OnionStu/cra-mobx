import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Input, Checkbox, Icon, Button, Radio, List, Row, Col } from 'antd'

import style from './todos.module.less'

const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const ListItem = List.Item

class TodoItem extends Component {
  toggleChecked = event => {
    this.props.handleCheck(this.props.item, event.target.checked)
  }

  handleDelete = () => {
    this.props.handleDelete(this.props.item)
  }
  render() {
    const { item } = this.props
    return (
      <ListItem>
        <Checkbox checked={!!item.finished} onChange={this.toggleChecked} />
        {item.msg}
        <Icon type="close" onClick={this.handleDelete} />
      </ListItem>
    )
  }
}

const ListHeader = props => {
  return (
    <div>
      TODO: <Input onPressEnter={props.handleAdd} />
    </div>
  )
}

const ListFooter = props => {
  return (
    <div>
      <div>待办数量: {props.todos.unfinishCount}</div>
      <Button type="dashed" onClick={props.handleClear}>
        Clear Finished
      </Button>
      <Button type="danger" onClick={props.fetchList}>
        Fetch
      </Button>
      <RadioGroup
        onChange={props.handleTypeChange}
        value={props.todos.listType}
      >
        <RadioButton value="all">全部</RadioButton>
        <RadioButton value="todo">待办</RadioButton>
        <RadioButton value="done">已办</RadioButton>
      </RadioGroup>
    </div>
  )
}

const TodoList = props => (
  <List
    header={<ListHeader handleAdd={props.handleAdd} />}
    footer={
      <ListFooter
        todos={props.todos}
        handleTypeChange={props.handleTypeChange}
        fetchList={props.fetchList}
        handleClear={props.handleClear}
      />
    }
    bordered
    dataSource={props.todos.showList}
    renderItem={item => (
      <TodoItem
        item={item}
        handleCheck={props.handleItemCheck}
        handleDelete={props.handleItemDelete}
      />
    )}
  />
)

@inject('todos')
@observer
class TodoListView extends Component {
  render() {
    const { todos } = this.props
    return (
      <div>
        <TodoList
          todos={todos}
          fetchList={this.fetch}
          handleAdd={this.onAdd}
          handleClear={this.handleClear}
          handleItemCheck={this.handleItemCheck}
          handleItemDelete={this.handleItemDelete}
          handleTypeChange={this.onTypeChange}
        />
      </div>
    )
  }
  onAdd = event => {
    let inputValue = event.target.value
    inputValue.trim() && this.props.todos.addTodo(inputValue)
    event.target.value = ''
  }
  onTypeChange = event => {
    this.props.todos.changeListType(event.target.value)
  }
  handleItemCheck = (todo, checked) => {
    this.props.todos.changeTodoState(todo.id, checked)
  }
  handleItemDelete = todo => {
    this.props.todos.delTodo(todo.id)
  }
  handleClear = () => {
    this.props.todos.clearFinished()
  }
  fetch = () => {
    this.props.todos.fetchList()
  }
}

export default TodoListView
