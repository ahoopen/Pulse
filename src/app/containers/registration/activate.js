import React, {Component} from 'react';
import {connect} from 'react-redux';
import {UserActivate} from '../../actions/register.action';
import {UserLoginSuccess} from '../../actions/user.action';

import {
    Paper,
    TextField,
    RaisedButton
} from 'material-ui';

class Activate extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    };

    componentWillUpdate(nextProps) {
        if (nextProps.token) {
            this.props.loginSuccess(nextProps.token);
            this.context.router.push('/dashboard');
        }
    }

    activateAccount() {
        const activationCode = this.refs.verifyCode.getValue();
        this.props.activateAccount(activationCode);
    }

    render() {
        return (
            <Paper className="registration">
                <div>{this.props.errorMessage}</div>
                <TextField
                    ref='verifyCode'
                    floatingLabelText='Verify code'
                    multiLine={false}
                    fullWidth={true}
                />
                <RaisedButton
                    primary={true}
                    label="Activate"
                    onClick={(e)=> this.activateAccount(e)}/>
            </Paper>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    activateAccount: (data) => {
        dispatch(UserActivate(data));
    },
    loginSuccess: (token) => {
        dispatch(UserLoginSuccess(token));
    }
});

export default connect(
    (state) => state.register,
    mapDispatchToProps
)(Activate);
