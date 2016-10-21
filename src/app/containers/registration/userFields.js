import React, { Component } from 'react';
import {
    TextField,
    RaisedButton,
    FlatButton
} from 'material-ui';

class UserFields extends Component {

    nextStep(e) {
        e.preventDefault();

        var data = {
            name    : this.refs.name.getValue(),
            surname : this.refs.surname.getValue(),
        };

        this.props.saveValues(data);
        this.props.nextStep();
    }

    render() {
        return (
            <div>
                <TextField
                    ref='name'
                    floatingLabelText='Name'
                    multiLine={false}
                    fullWidth={true}
                    defaultValue={this.props.fieldValues.name}
                />
                <TextField
                    ref='surname'
                    floatingLabelText='Surname'
                    multiLine={false}
                    fullWidth={true}
                    defaultValue={this.props.fieldValues.surname}
                />
                <FlatButton className="btn -default pull-left" onClick={this.props.previousStep}>Back</FlatButton>
                <RaisedButton
                    primary={true}
                    label="Save and continue"
                    onClick={(e)=> this.nextStep(e)} />
            </div>
        );
    }
}
export default UserFields;
