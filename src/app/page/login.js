import React, {Component} from 'react';
import {connect} from 'react-redux';
import KeyHandler, {KEYPRESS} from 'react-key-handler';

import {
    TextField,
    FlatButton,
    RaisedButton,
    Card,
    CardActions
} from 'material-ui';
import {UserLogin} from '../actions/user.action';

class Login extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    };

    login() {
        const { email, password  } = this.refs;
        this.props.login(email.getValue(), password.getValue());
    }

    passwordReset() {
        this.context.router.push('password/forgotten');
    }

    componentWillUpdate(nextProps) {
        if (nextProps.isAuthenticated) {
            this.context.router.push('/dashboard');
        }
    }

    render() {
        let errMessage = '';

        if(this.props.statusText) {
            errMessage = <div>User is not authenticated!</div>;
        }

        return (
            <Card className="login">
                <KeyHandler keyEventName={KEYPRESS} keyValue="Enter" onKeyHandle={this.login.bind(this)} />
                <div>{errMessage}</div>
                <TextField
                    ref='email'
                    floatingLabelText='Email'
                    multiLine={false}
                    fullWidth={true}/>
                <TextField
                    ref='password'
                    floatingLabelText='Password'
                    multiLine={false}
                    fullWidth={true}
                    type="password"/>
                <CardActions>
                    <FlatButton label="Forgot password" onClick={() => this.passwordReset() }/>
                    />
                    <RaisedButton
                        label="Login"
                        primary={true}
                        disabled={this.props.isAuthenticated}
                        onClick={() => this.login() }/>
                </CardActions>
            </Card>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login(email, password) {
            dispatch(UserLogin(email, password));
        }
    }
};

export default connect(
    (state) => state.user,
    mapDispatchToProps
)(Login);
