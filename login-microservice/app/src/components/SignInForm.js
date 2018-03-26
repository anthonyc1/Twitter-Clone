import React from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {RaisedButton} from 'material-ui';
import {Paper} from 'material-ui';
import { Link } from 'react-router-dom'


export class SignInForm extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        usernameHint: "Username",
        passwordHint: "Password",
        error: "",
        errorMessage: ""
    };
    this.submit = this.submit.bind(this);
    this.guest = this.guest.bind(this);
    this.hintUsername = this.hintUsername.bind(this);
    this.hintPassword = this.hintPassword.bind(this);
}

hintUsername(e){
    this.setState({
        usernameHint: "Username"
        });    
}

hintPassword(e){
    this.setState({
        passwordHint: "Password"
    });    
}

guest(e){
    this.setState({
        usernameHint: "",
        passwordHint: ""
    });
    $("#username").val("guest");
    $("#password").val("1234");
}

submit(e){
    var username;
    var password;
    e.preventDefault();
    $(".start-form input").filter(function(key, object) {
        if(object.name == 'username'){
            username = object.value;
        }else if(object.name == 'password'){
            password = object.value;
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
        if(password.length < 4){
            flag = false;
            this.setState({
                error: "password",
                errorMessage: "please enter a valid password"
            });
        }
    }
    if(flag == true){
     $.post({
         url: "/login",
         type: "POST",
        data: JSON.stringify({ 'username': username,
            'password': password,
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
                    location.reload();
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
            <div className="">

            </div>
            <div className="card-fields">
                <form className="start-form">
                        <div><TextField  onKeyUp={this.hintUsername} errorText={(this.state.error == 'username')?this.state.errorMessage:""} id="username" name="username" required="required" hintText={this.state.usernameHint} /></div>
                        <div><TextField  onKeyUp={this.hintPassword} errorText={(this.state.error == 'password')?this.state.errorMessage:""} id="password" name="password" type="password" required="required" hintText={this.state.passwordHint} /></div>
                    <div className="button-style">
                            <RaisedButton onClick={this.submit} label="Sign In" backgroundColor="#E57373" labelStyle={{color: "#fff"}} type="button"/>
                    </div>
                </form>
                <div style={{fontSize:'12px', padding: '30px 0 0 46px', color:'#00796B'}}><span>Join today&nbsp;</span><Link style={{textDecoration:'none'}} to='/createAccount'>Create an account</Link></div>
                <div style={{fontSize:'12px', padding: '10px 0 5px 66px', color:'#00796B'}}><span>or &nbsp;</span><Link style={{textDecoration:'none'}} onClick={this.guest} to=''>Continue as guest</Link></div>
            </div>
        </Paper>
    </MuiThemeProvider>
</div>);
}
} 
