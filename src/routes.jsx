import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './modules/home'
import Todos from './modules/todos'
import NoMatch from './modules/NoMatch'
import TestDemo from './modules/testDemo'

export default (
  <Route>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/todos" component={Todos} />
      <Route path="/test" component={TestDemo} />
      <Route component={NoMatch} />
    </Switch>
  </Route>
)
