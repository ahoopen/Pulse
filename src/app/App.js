import React, {Component} from 'react';
import '../scss/app.scss';
import {connect} from 'react-redux';
import {AppBar, RaisedButton, FlatButton} from 'material-ui';
import LoggedIn from './components/logged';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    };

    login() {
        return (<div>
            <FlatButton label="register" onClick={() => this.gotoRegister()}/>
            <RaisedButton onClick={() => this.gotoLogin()}>Login</RaisedButton>
        </div>);
    }

    gotoLogin() {
        this.context.router.push('/login');
    }

    gotoRegister() {
        this.context.router.push('/register');
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
                <div className="app-content">
                    {this.props.children}
                </div>
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

