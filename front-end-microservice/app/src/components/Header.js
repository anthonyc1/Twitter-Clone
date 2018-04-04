import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import appText from '../../data/app_text.json'

var headerPaper = {
    backgroundColor: "#f9f9fa",
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
    backgroundColor: "#EDE7F6",
    border: "1px solid #EDE7F6",
    height: 30,
    lineHeight: "40px"
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
                    <div className="row">
                        <div className="col-3">
                            <span style={headerLabel}>{appText.header_text}</span>
                        </div>
                        <div className="col-6">
                            <form>
                                <div className="form-group" style={{margin: 0}}>
                                    <input style={headerSearch} type="search" className="form-control" id="search" placeholder="search"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </Paper>
            </MuiThemeProvider>
        )}

}
