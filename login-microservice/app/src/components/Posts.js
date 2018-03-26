import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {RaisedButton} from 'material-ui';
import {IconButton} from 'material-ui';
import {Paper} from 'material-ui';
import {Dialog} from 'material-ui';
import {Subheader} from 'material-ui';
import {CustomDialog} from './CustomDialog';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

export class Posts extends React.Component {
constructor(props) {
	super(props);
	this.state = {
		
		};
}
render() {
	return (
		<div><div style={{marginBottom:"60px"}}><MuiThemeProvider>
		<AppBar style={{backgroundColor: "#E57373"}}
		iconElementLeft={<span></span>}
		title={<span style={{fontSize: "20px"}}>NAME IS IN DEV...</span>}
		iconElementRight={<FlatButton onClick={function(){
			window.location.href= "/logout"
		}} style={{verticalAlign: "middle"}} label="Sign Out" />}/>
		</MuiThemeProvider>
			</div>
			</div>
        )//return
	}
} 
