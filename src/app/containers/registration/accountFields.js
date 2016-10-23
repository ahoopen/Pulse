import React, {Component} from 'react';
import {
    TextField,
    FlatButton,
} from 'material-ui';

class AccountFields extends Component {

    nextStep(e) {
        e.preventDefault();

        var data = {
            email: this.refs.email.getValue(),
            password: this.refs.password.getValue(),
        };

        this.props.saveValues(data);
        this.props.nextStep();
    }

    render() {
        return (
            <div>
                <TextField
                    ref='email'
                    floatingLabelText='Email'
                    multiLine={false}
                    fullWidth={true}
                    defaultValue={this.props.fieldValues.email}
                />
                <TextField
                    ref='password'
                    floatingLabelText='Password'
                    multiLine={false}
                    fullWidth={true}
                    type="password"
                    defaultValue={this.props.fieldValues.password}
                />
                <div className="registration__controls">
                    <FlatButton
                        label="Next"
                        onClick={(e)=> this.nextStep(e)}/>
                </div>
            </div>
        );
    }
}
export default AccountFields;
