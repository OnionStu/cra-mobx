import React from 'react'

export default props => {
  return (
    <div>
      <h3>
        Page <em>{props.location.pathname}</em> Not Found
      </h3>
    </div>
  )
}
