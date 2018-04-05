import React from 'react';
var ReactDOM = require('react-dom');
import {IndexPage} from './IndexPage';
import {BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
	  return (
          <Switch>
              <Route  exact path='/' component={IndexPage}/>
            </Switch>
		)
	}
}

ReactDOM.render(
        <BrowserRouter>
       <App />
     </BrowserRouter>,document.getElementById("react"));
