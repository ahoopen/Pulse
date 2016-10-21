import React, {Component} from 'react';

import {
    RaisedButton,
    FlatButton
} from 'material-ui';

class Confirmation extends Component {

    render() {
        return (<div>
            <h2>Confirm Registration</h2>
            <ul>
                <li><b>Name:</b> {this.props.fieldValues.name}</li>
                <li><b>Email:</b> {this.props.fieldValues.email}</li>
                <li><b>Age:</b> {this.props.fieldValues.surname}</li>
            </ul>
            <ul className="form-fields">
                <li className="form-footer">
                    <FlatButton
                        className="btn -default pull-left"
                        onClick={this.props.previousStep}
                        label="Back" />
                    <RaisedButton
                        className="btn -primary pull-right"
                        primary={true}
                        onClick={this.props.submitRegistration}
                        label="Submit
                        Registration" />
                </li>
            </ul>
        </div>);
    }
}
export default Confirmation;
