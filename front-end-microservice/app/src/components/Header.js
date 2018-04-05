import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import appText from '../../data/app_text.json'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
var MenuIcon = require('react-icons/lib/md/apps');

var headerPaper = {
    backgroundColor: "#fdf9f3",
    height: 40,
    marginTop: 0
}

var headerLabel = {
    color: '#00796B',
    fontSize: 20,
    lineHeight: "40px",
    fontWeight: 400,
    paddingLeft: 10   
}

var headerSearch = {
    marginTop: 5,
    backgroundColor: "#e8e7e7",
    border: "1px solid #e8e7e7",
    height: 30,
    lineHeight: "40px",
    width: "80%"
}


var postButton = {
    width: "130px",
    height: "30px",
    marginTop: 5,
    float: "right"
}

var postLabelButton = {
    fontWeight: "bold",
    fontSize: "14",
    paddingLeft: 5,
    paddingRight: 5,
    fontFamily: "HelveticaNeue-CondensedBold",
    lineHeight: "30px"
}


var menuIconStyle = {
    height: "38px",
    width: "2em",
    marginTop: 2
}

var menuIconContainerStyle = {
    float: "right"
}


export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
    	return (
            <MuiThemeProvider>
                <Paper className="fix-top" style={headerPaper}>
                    <div className="row" style={{margin: 0}}>
                        <div className="col-md-3">
                            <span style={headerLabel}>{appText.header_text}</span>
                        </div>
                        <div className="col-md-6" style={{paddingLeft: "4%"}}>
                            <form>
                                <div className="form-group" style={{margin: 0}}>
                                    <input style={headerSearch} type="search" className="form-control" id="search" placeholder="search"/>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-2">
                            <RaisedButton overlayStyle={{border: "2px solid #0a0a0a"}} labelStyle={postLabelButton} label="write a post" backgroundColor="#66e2d5" style={postButton} />
                        </div>
                        <div className="col-md-1">
                        <IconMenu menuStyle={{backgroundColor: "#fdf9f3"}} style={menuIconContainerStyle} useLayerForClickAway={true} iconButtonElement={<div><MenuIcon style={menuIconStyle}/></div>} anchorOrigin={{horizontal: 'left', vertical: 'top'}} targetOrigin={{horizontal: 'left', vertical: 'bottom'}}>
                        <MenuItem primaryText="sign in" />
                        <MenuItem primaryText="create account" />
                        <MenuItem primaryText="Sign out" />
                        </IconMenu>
                        </div>
                    </div>
                </Paper>
            </MuiThemeProvider>
        )}

}
