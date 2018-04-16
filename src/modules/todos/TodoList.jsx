import React from 'react'
import { List } from 'antd'
import { observer } from 'mobx-react'
import TodoItem from './TodoItem'
import ListHeader from './ListHeader'
import ListFooter from './ListFooter'

const TodoList = observer(props => (
  <List
    className="todo-list"
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
    renderItem={item => {
      console.log('...')

      return (
        <TodoItem
          item={item}
          handleCheck={props.handleItemCheck}
          handleDelete={props.handleItemDelete}
        />
      )
    }}
  />
))

export default TodoList
