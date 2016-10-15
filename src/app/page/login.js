import React, {Component} from 'react';
import {connect} from 'react-redux';

import {TextField, FlatButton, Card, CardActions} from 'material-ui';
import {UserLogin} from '../actions/login.action';

class Login extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    };

    login() {
        const {dispatch} = this.props;

        dispatch(UserLogin(this.refs.username.getValue(), this.refs.password.getValue()));
    }

    componentWillUpdate(nextProps) {
        if (nextProps.isAuthenticated) {
            this.context.router.push('/dashboard');
        }
    }

    render() {
        return (
            <div className="login">
                <Card>
                    <TextField
                        ref='username'
                        floatingLabelText='Username'
                        multiLine={false}
                        fullWidth={true}/>
                    <TextField
                        ref='password'
                        floatingLabelText='Password'
                        multiLine={false}
                        fullWidth={true}
                        type="password"/>
                    <CardActions>
                        <FlatButton id="login-button" label="Login" disabled={this.props.isAuthenticated}
                                    onClick={() => this.login() }/>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state.login;
};

export default connect(
    mapStateToProps
)(Login);
