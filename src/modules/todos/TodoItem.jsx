import React, { Component } from 'react'
import { List, Checkbox, Icon } from 'antd'
import { observer } from 'mobx-react'

const ListItem = List.Item

@observer
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
      <ListItem actions={[<Icon type="close" onClick={this.handleDelete} />]}>
        <Checkbox checked={!!item.finished} onChange={this.toggleChecked} />
        {item.msg}
      </ListItem>
    )
  }
}

export default TodoItem
