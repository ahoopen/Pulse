import React, {Component} from 'react';
import '../scss/app.scss';
import {connect} from 'react-redux';
import {AppBar, Drawer, MenuItem, Divider, RaisedButton, FlatButton} from 'material-ui';
import LoggedIn from './components/logged';

import NavigationMenu from './containers/navigation/navigation-menu';

import DehazeIcon from 'material-ui/svg-icons/image/dehaze';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    };

    state = {
        open: false
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

    handleToggle = () => this.setState({open: !this.state.open});

    onClickHandler = (route) => {
        this.handleToggle();
        this.context.router.push(route);
    };

    renderContent() {

        return (
            <div className="App">
                <AppBar
                    title="Pulse"
                    iconElementLeft={<DehazeIcon onClick={this.handleToggle}></DehazeIcon>}
                    iconElementRight={this.props.isAuthenticated ? this.logged() : this.login()}
                />
                <div className="app-content">
                    {this.props.children}
                </div>

                <NavigationMenu
                    open={this.state.open}
                    toggleNavigation={this.handleToggle}
                    onClickHandler={this.onClickHandler}
                />
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

