import { observable, action, computed, runInAction, flow } from 'mobx'
import fetch from '../../utils/fetch'

const listType = {
  ALL: 'all',
  TODO: 'todo',
  DONE: 'done'
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
      params.msg && (this.msg = params.msg)
      // 接口测试
      params.description && (this.msg = params.description)
    }
  }
}

class Todos {
  @observable list = []
  @observable listType = listType.ALL

  @computed
  get showList() {
    switch (this.listType) {
      case listType.ALL:
        return this.list
      case listType.TODO:
        return this.unfinishList
      case listType.DONE:
        return this.finishList
      default:
        return this.list
    }
  }

  @computed
  get finishList() {
    return this.list.filter(todo => todo.finished)
  }

  @computed
  get unfinishList() {
    return this.list.filter(todo => !todo.finished)
  }

  get unfinishCount() {
    return this.unfinishList.length
  }

  @action
  addTodo(todo) {
    this.list.push(new Todo(todo))
  }

  @action
  delTodo(id) {
    this.list = this.list.filter(todo => id !== todo.id)
  }

  @action
  changeTodoState(id, state) {
    console.log(id, state)
    this.list.find(todo => id === todo.id).finished = !!state
  }

  @action
  changeListType(type) {
    this.listType = type
  }

  @action
  clearFinished() {
    this.list = this.unfinishList
  }

  @action
  async fetchList() {
    try {
      const resp = await fetch('food?q=s')
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
      const resp = yield fetch('food?q=ra')
      console.log(resp)
      runInAction(() => {
        this.list = resp.map(item => new Todo(item))
      })
    } catch (error) {
      console.error('...。。。2....', error)
    }
  })
}

export default Todos
