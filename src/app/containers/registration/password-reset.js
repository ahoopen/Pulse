import React, {Component} from 'react';
import {connect} from 'react-redux';
import {UserPasswordReset} from '../../actions/user.action';

import {
    Paper,
    TextField,
    RaisedButton
} from 'material-ui';

class PasswordReset extends Component {

    resetPassword() {
        const email = this.refs.email.getValue();

        this.props.resetPassword(email);
    }

    renderPasswordResetMessage() {
        return (
            <Paper className="registration">
                <h2>Successfully requested a password reset!</h2>
                <p>Please check your email <b>{}</b> for a link to reset your password.</p>
            </Paper>
        );
    }

    render() {
        if(this.props.isPasswordReset) {
            return this.renderPasswordResetMessage();
        }

        return (
            <Paper className="registration">
                <h2>Password reset</h2>
                <TextField
                    ref='email'
                    floatingLabelText='email'
                    multiLine={false}
                    fullWidth={true}
                />
                <RaisedButton
                    primary={true}
                    label="Reset password"
                    onClick={(e)=> this.resetPassword(e)}/>
            </Paper>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    resetPassword: (email) => {
        dispatch(UserPasswordReset(email));
    }
});

export default connect(
    (state) => state.user,
    mapDispatchToProps
)(PasswordReset);
