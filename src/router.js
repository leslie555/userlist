import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import ListUsers from './components/ListUsers';
import TryPage from './components/TryPage'
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/users" exact component={ListUsers} />
        <Route path="/try" exact component={TryPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
