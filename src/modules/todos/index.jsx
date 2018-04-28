import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import TodoList from './TodoList'
import { getItem } from '../../utils'
import './todos.module.less'

@inject('todos')
@observer
class TodoListView extends Component {
  componentWillMount() {
    const {
      match: { params },
      todos
    } = this.props
    todos.changeListType(params.type)
  }

  componentDidMount() {
    const todos = getItem('todos')
    if (todos) {
      this.props.todos.setTodos(todos)
    }
  }

  render() {
    return (
      <div className="todos-page">
        <TodoList
          todos={this.props.todos}
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
    const type = event.target.value
    this.props.history.push('/todos/' + type)
    this.props.todos.changeListType(type)
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
    this.props.todos.fetchOtherList()
  }
}

export default TodoListView
