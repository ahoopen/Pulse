import React, {Component} from 'react';
import {connect} from 'react-redux';

import {TextField, FlatButton, Card, CardActions} from 'material-ui';
import {UserLogin} from '../actions/login.action';

class Login extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    };

    login() {
        const { email, password  } = this.refs;
        this.props.login(email.getValue(), password.getValue());
    }

    componentWillUpdate(nextProps) {
        if (nextProps.isAuthenticated) {
            this.context.router.push('/dashboard');
        }
    }

    render() {
        let errMessage = '';

        if(!this.props.isAuthenticated) {
            errMessage = <div>User is not authenticated!</div>;
        }

        return (
            <Card className="login">
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
                    <FlatButton id="login-button" label="Login" disabled={this.props.isAuthenticated}
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
    (state) => state.login,
    mapDispatchToProps
)(Login);
