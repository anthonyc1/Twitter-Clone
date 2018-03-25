import React from 'react';
var ReactDOM = require('react-dom');
import {CreateAccountForm} from './components/CreateAccountForm';
import {SignInForm} from './components/SignInForm';
import {BrowserRouter, Switch, Route } from 'react-router-dom'

class App extends React.Component {
  render() {
	  return (
          <Switch>
              <Route  exact path='/' component={SignInForm}/>
              <Route  exact path='/ttt' component={SignInForm}/>
              <Route exact path='/createAccount' component={CreateAccountForm}/>
            </Switch>
		)
	}
}

ReactDOM.render(
        <BrowserRouter>
       <App />
     </BrowserRouter>
    ,document.getElementById("react"));
