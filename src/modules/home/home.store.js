// import { observable, computed, reaction, action } from "mobx";
import { observable, action } from 'mobx'

export default class HomeStore {
  @observable msg = 'world'
  @observable count = 0

  @action
  sayHi(name) {
    console.log('Hi~%s', name)
  }

  @action
  changeMsg(msg) {
    this.msg = msg
  }
  @action
  add() {
    this.count++
  }
}
