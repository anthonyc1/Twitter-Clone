import React from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {RaisedButton} from 'material-ui';
import {Paper} from 'material-ui';
import { Link } from 'react-router-dom'


export class CreateAccountForm extends React.Component {
    constructor(props) {
    super(props);
    let queries = this.props.location.search;
    this.state = {
        error: "",
        errorMessage: ""
    };
    this.submit = this.submit.bind(this);
    }

submit(e){
    var username;
    var email;
    var password;
    var confirmPassword
    e.preventDefault();
    $(".start-form input").filter(function(key, object) {
        if(object.name == 'username'){
            username = object.value;
        }else if(object.name == 'email'){
            email = object.value;
        }else if(object.name == 'password'){
            password = object.value;
        }
        else if(object.name == 'confirmPassword'){
            confirmPassword = object.value;
        }
    });
    var flag = true;
    if(username.length < 1){
        flag = false;
        this.setState({
            error: "username",
            errorMessage: "please enter a valid username"
        });
    }
    if(flag == true){
        if(!validateEmail(email)){
            flag = false;
            this.setState({
                error: "email",
                errorMessage: "please enter a valid email"
            });
        }
    }
    if(flag == true){
        if(password.length < 4){
            flag = false;
            this.setState({
                error: "password",
                errorMessage: "password must have minimum of 4 characters"
            });
        }
    }
    if(flag == true){
        if(password !== confirmPassword){
            flag = false;
            this.setState({
                error: "confirmPassword",
                errorMessage: "These passwords don't match."
            });
        }
    }
    if(flag == true){
     $.post({
         url: "/adduser",
         type: "POST",
        data: JSON.stringify({ 'username': username,
            'password': password,
            'confirmPassword': confirmPassword,
            'email': email
        }),
        dataType: "text",
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            var response = JSON.parse(data);
            this.setState({
                error: response.error,
                errorMessage: response.errorMessage
            });
            if(response.status == "OK"){
                window.location.href = '/';
            }
        }.bind(this)
    });
}
}
    render() {
  return (
<div>
    <MuiThemeProvider>
        <Paper zDepth={1} circle={false} style={{
                paddingBottom: "25px",
                width: "350px"
            }}>
            <div>

            </div>
            <div className="card-fields">
                <form className="start-form">
                        <div><TextField errorText={(this.state.error == 'username')?this.state.errorMessage:""} id="username" name="username" hintText="Username"/></div>
                        <div><TextField errorText={(this.state.error == 'email')?this.state.errorMessage:""} id="email" name="email" hintText="Email"/></div>
                        <div><TextField errorText={(this.state.error == 'password')?this.state.errorMessage:""} id="password" name="password" type="password" hintText="Password"/></div>
                        <div><TextField errorText={(this.state.error == 'confirmPassword')?this.state.errorMessage:""} id="confirmPassword" name="confirmPassword" type="password" hintText="Confirm password"/></div>
                    <div style={{padding:'30px 0 0 50px'}}>
                        <RaisedButton onClick={this.submit} label="Create Account" backgroundColor="#E57373" labelStyle={{color: "#fff"}} type="button"/>
                    </div>
                </form>
                <div style={{fontSize:'12px', padding: '30px 0 0 102px', color:'#00796B'}}><span>or &nbsp;</span><Link style={{textDecoration:'none'}} to='/'>Sign In</Link></div>
            </div>
        </Paper>
    </MuiThemeProvider>
</div>); //return
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
