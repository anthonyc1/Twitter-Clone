import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {RaisedButton} from 'material-ui';
import {Paper} from 'material-ui';
import {Dialog} from 'material-ui';

var dialogStyle = {
	height:'200px',
	width:'300px',
	backgroundColor:'#fff',
    position: "absolute",
    left: '147px',
    right: 0,
    top: '105px',
    margin: 0,
    bottom: 0
};

var dialogBodyStyle = {
    padding: '50px 0 0 90px'
};


var dialogLabelStyle = {
    height: '30px',
    width: '100px',
    color: '#00796B',
    padding: '15px 0 10px 9px',
    textAlign: 'center',
    verticalAlign: 'middle',
    fontSize: '20px'
};

var dialogButtonStyle = {
    padding: '30px 0 0 2.5px'
};

export const CustomDialog = (props) => (
            <MuiThemeProvider>
            <Paper zDepth={5} circle={false} className="custom-dialog" style={{height:'200px',
			width:'300px',
			backgroundColor:'#fff',
		    position: "absolute",
		    left: '147px',
		    right: 0,
		    top: '105px',
		    margin: 0,
		    bottom: 0, display:(props.show == true)?"unset":"none"}}>
                <div className="dialog-body" style={dialogBodyStyle}>
                <div className="dialog-label" style={dialogLabelStyle}>{props.text}</div>
                <div className="play-again-button" style={dialogButtonStyle}><MuiThemeProvider>
                <RaisedButton onClick={props.restart} label="PLAY AGAIN" backgroundColor="#73FCD6" labelStyle={{color:"#fff"}} type="button"/>
                </MuiThemeProvider></div>
                </div>
            </Paper>
            </MuiThemeProvider>
        )//return
