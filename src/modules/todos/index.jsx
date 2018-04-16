import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import TodoList from './TodoList'
import './todos.module.less'

@inject('todos')
@observer
class TodoListView extends Component {
  render() {
    const { todos } = this.props
    return (
      <div className="todos-page">
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
