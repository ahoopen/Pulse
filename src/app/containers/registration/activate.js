import React, {Component} from 'react';
import {connect} from 'react-redux';
import {UserActivate} from '../../actions/register.action';
import {UserLoginSuccess} from '../../actions/user.action';

import {
    Paper,
    TextField,
    RaisedButton,
    Snackbar
} from 'material-ui';

class Activate extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    };

    state = {
        success: false
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            success: !!nextProps.token
        });

        if (nextProps.token) {
            setTimeout(() => {
                this.props.loginSuccess(nextProps.token);
                this.context.router.push('/dashboard');
            }, 2000);
        }
    }

    activateAccount() {
        const activationCode = this.refs.verifyCode.getValue();
        this.props.activateAccount(activationCode);
    }

    render() {
        return (
            <div>
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
                <Snackbar
                    open={this.state.success}
                    message="Account activated"
                    autoHideDuration={1500}
                /></div>
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
