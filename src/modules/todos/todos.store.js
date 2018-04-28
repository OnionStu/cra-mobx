import { observable, action, computed, runInAction, flow, toJS } from 'mobx'
import fetch from '../../utils/fetch'
import { saveItem } from '../../utils'

const listType = {
  ALL: 'all',
  TODO: 'todo',
  DONE: 'done'
}

const selectType = type => {
  switch (type) {
    case listType.ALL:
    case listType.TODO:
    case listType.DONE:
      return type
    default:
      return listType.ALL
  }
}

class Todo {
  id = Math.random()
  @observable msg = ''
  @observable finished = false
  constructor(params) {
    // if(!!params) throw new Error()
    if ('string' === typeof params) {
      this.msg = params
    } else if (!!params && 'object' === typeof params) {
      if (params.msg) {
        this.msg = params.msg
        this.finished = !!params.finished
      }
    }
  }
}

class Todos {
  @observable list = []
  @observable listType = listType.ALL

  @computed
  get showList() {
    console.log('computed showList : %s', this.listType)
    switch (this.listType) {
      case listType.ALL:
        return this.list.slice()
      case listType.TODO:
        return this.todoList
      case listType.DONE:
        return this.finishList
      default:
        return this.list
    }
  }

  @computed
  get finishList() {
    console.log('computed finishList')
    return this.list.filter(todo => todo.finished)
  }

  @computed
  get todoList() {
    console.log('computed todoList')
    return this.list.filter(todo => !todo.finished)
  }

  @computed
  get todosCount() {
    console.log('computed todos count')
    return this.todoList.length
  }

  @action
  addTodo(todo) {
    console.log('add list')
    this.list.push(new Todo(todo))
    saveItem('todos', toJS(this.list))
  }

  @action
  delTodo(id) {
    console.log('delete list')
    this.list = this.list.filter(todo => id !== todo.id)
    saveItem('todos', toJS(this.list))
  }

  @action
  changeTodoState(id, state) {
    console.log(id, state)
    this.list.find(todo => id === todo.id).finished = !!state
  }

  @action
  changeListType(type) {
    console.log('change type: %s', type)
    this.listType = selectType(type)
  }

  @action
  clearFinished() {
    console.log('clearFinished')
    this.list = this.todoList
    saveItem('todos', toJS(this.list))
  }

  @action
  setTodos(todos) {
    this.list = todos.map(item => new Todo(item))
  }

  @action
  async fetchList() {
    try {
      const resp = await fetch('/api/food?q=s')
      console.log(resp)
      runInAction(() => {
        this.list = resp.map(item => new Todo(item))
      })
    } catch (error) {
      console.error('...。。。....', error)
    }
  }

  fetchOtherList = flow(function*() {
    try {
      const resp = yield fetch('/mock/todos')
      console.log(resp)
      this.list = resp.map(item => new Todo(item))
    } catch (error) {
      console.error('...。。。2....', error)
    }
  })
}

export default Todos
