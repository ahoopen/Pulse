import React, {Component} from 'react';
import '../scss/app.scss';
import {Link} from 'react-router'
import {connect} from 'react-redux';
import {AppBar} from 'material-ui';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {

    login() {
        return <Link to="/login">Login</Link>;
    }

    logged() {
        return <div>Logged in!</div>;
    }

    renderContent() {

        return (
            <div className="App">
                <AppBar
                    title="Pulse"
                    iconElementRight={this.props.isAuthenticated ? this.logged() : this.login()}
                />
                    <ul>
                        <li><Link to="/register">Register</Link></li>
                    </ul>
                    {this.props.children}
            </div>
        );
    }

    render() {
        return (
            <MuiThemeProvider>
                {this.renderContent()}
            </MuiThemeProvider>
        );
    }
}

function mapStateToProps(state) {
    return state.login;
}

export default connect(
    mapStateToProps
)(App);

