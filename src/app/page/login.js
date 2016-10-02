import React, {Component} from 'react';
import {connect} from 'react-redux';

import {TextField, FlatButton, Card, CardActions} from 'material-ui';
import {UserLogin} from '../actions/index';

class Login extends Component {

    constructor(props) {
        super(props);

        console.log(props);
    }


    login() {
        const {dispatch} = this.props;

        dispatch(UserLogin(this.refs.username.getValue(), this.refs.password.getValue()));
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
                    {/*<div style={{float: 'right'}}>*/}
                    <CardActions>
                        <FlatButton id="login-button" label="Login" onClick={() => this.login() }/>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(
    mapStateToProps
)(Login);
