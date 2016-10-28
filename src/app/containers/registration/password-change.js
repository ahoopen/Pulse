import React, {Component} from 'react';
import {connect} from 'react-redux';
import {UserLoginSuccess} from '../../actions/user.action';

import {
    Paper,
    TextField,
    RaisedButton,
    Snackbar
} from 'material-ui';

class PasswordChange extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    };

    state = {
        password: null,
        passwordRepeat: null,
        success: false
    };

    fetchRequest(url, options = {}) {
        return fetch(url, options)
            .then(response => response.json())
            .catch((err) => {
                throw err
            });
    }

    componentWillMount() {
        this.fetchRequest(`http://127.0.0.1:1337/api/user/password/reset/${this.props.params.id}`)
            .then((response) => {
                if (!response.success) {
                    this.setState(response);
                }
            });
    }

    setNewPassword() {
        const token = this.props.params.id;
        const url = `http://127.0.0.1:1337/api/user/password/reset/${token}`;
        const { password, password2: passwordRepeat } = this.refs;

        this.fetchRequest(url, this.getPasswordChangeRequestOptions({
                password: password.getValue(),
                passwordRepeat: passwordRepeat.getValue()
            }))
            .then((response) => this.setState(response))
            .then(() => this.LoginAndRedirectToDashboard());
    }

    getPasswordChangeRequestOptions(payload) {
        return {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        };
    }

    LoginAndRedirectToDashboard() {
        setTimeout(() => {
            this.props.autoLogin(this.state.token);
            this.context.router.push('/');
        }, 2000);
    }

    render() {
        if (!this.state.errorMessage) {
            return (
                <div>
                    <Paper className="registration">
                        <h2>Change password </h2>
                        <TextField
                            ref='password'
                            floatingLabelText='password'
                            type="password"
                            multiLine={false}
                            fullWidth={true}
                        />
                        <TextField
                            ref='password2'
                            floatingLabelText='password repeat'
                            type="password"
                            multiLine={false}
                            fullWidth={true}
                        />
                        <RaisedButton
                            primary={true}
                            label="Change password"
                            onClick={()=> this.setNewPassword()}/>
                    </Paper>
                    <Snackbar
                        open={this.state.success}
                        message="Password changed"
                        autoHideDuration={1500}
                        onRequestClose={this.handleRequestClose}
                    />
                </div>);
        } else {
            return (
                <Paper className="registration">
                    <h2>Change password </h2>
                    <div>{this.state.errorMessage}</div>
                </Paper>
            );
        }
    }
}

const mapDispatchToProps = (dispatch) => ({

    autoLogin: (token) => {
        dispatch(UserLoginSuccess(token));
    }
});

export default connect(
    (state) => state.user,
    mapDispatchToProps
)(PasswordChange);
