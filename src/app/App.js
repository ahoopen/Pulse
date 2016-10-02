import React, {Component} from 'react';
import '../scss/app.scss';
import {Link} from 'react-router'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="App">
                    <ul>
                        <li><Link to="/login">Page 122</Link></li>
                        <li><Link to="/register">Page 2</Link></li>
                    </ul>
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
