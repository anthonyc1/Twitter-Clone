import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Paper} from 'material-ui';

export const HelloWorld = (props) => (
            <div>
            <MuiThemeProvider><Paper zDepth={1} circle={false} style={{height:"400px", width:"350px"}}>
            <div>Hello World!</div>
            </Paper></MuiThemeProvider>
            </div>
        )//return
