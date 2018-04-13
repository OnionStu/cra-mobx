# 注意事项

当 observer 需要组合其它装饰器或高阶组件时，请确保 observer 是最深处(第一个应用)的装饰器，否则它可能什么都不做。

withRouter 要放在最外层

```js
@withRouter
@inject('demo')
@observer
class Demo extends Component {
  render() {
    return <div>Children</div>
  }
}
```

用了 withRouter 之后的组件 对外没有 ref

```js
@withRouter
class Children extends Component {
  render() {
    return <div>Children</div>
  }
}

class Parent extends Component{
  render(){
    console.log(this.props.refs.children) // null
    return(
      <div>
        Parent
        <Children ref="children"/>
      <div>
    )
  }
}
```
