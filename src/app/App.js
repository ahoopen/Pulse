import React, {Component} from 'react';
import '../scss/app.scss';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {AppBar, RaisedButton} from 'material-ui';
import LoggedIn from './components/logged';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    };

    login() {
        return <RaisedButton onClick={() => this.gotoLogin()} >Login</RaisedButton>;
    }

    gotoLogin() {
        this.context.router.push('/login');
    }

    logged() {
        return <LoggedIn />;
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
    return state.user;
}

export default connect(
    mapStateToProps
)(App);

