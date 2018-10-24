import * as React from 'react';
import * as ReactDom from 'react-dom';
import { createBrowserHistory, History } from 'history';
import {
  Link,
  Route,
  RouteProps,
  Router,
  Switch,
  Redirect
} from 'react-router-dom';

import { Dashboard } from './dashboard';
import { Login } from './login';
// import * as Loadable from 'react-loadable';

import "./style/index.less";

interface HomePropsInfo {
}

interface HomeStateInfo {
}

const history = createBrowserHistory();

class Home extends React.Component<HomePropsInfo, HomeStateInfo> {
  constructor(props: HomePropsInfo) {
    super(props);

    this.state = {
    };
  }

  componentWillMount() {
  }

  render() {

    return (
      <Router history={ history }>
        <Switch>
          <Route exact path='/' component={ Dashboard } />
          <Route exact path='/login' component={ Login }/>
        </Switch>
      </Router>
    );
  }
}

ReactDom.render(<Home />, document.getElementById('content'));
