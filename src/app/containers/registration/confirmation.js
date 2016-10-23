import React, {Component} from 'react';

import {
    RaisedButton,
    FlatButton,
    Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui';

class Confirmation extends Component {

    render() {
        return (
            <div>
                <h2>Confirm Registration</h2>
                <Table>
                    <TableBody displayRowCheckbox={false}>
                        <TableRow>
                            <TableRowColumn>Name:</TableRowColumn>
                            <TableRowColumn>{this.props.fieldValues.name}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Surname:</TableRowColumn>
                            <TableRowColumn>{this.props.fieldValues.lastname}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Email:</TableRowColumn>
                            <TableRowColumn>{this.props.fieldValues.email}</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
                <div className="registration__controls">
                    <FlatButton
                        onClick={this.props.previousStep}
                        label="Back"/>
                    <RaisedButton
                        primary={true}
                        onClick={this.props.submitRegistration}
                        label="Submit Registration"/>
                </div>
            </div>
        );
    }
}
export default Confirmation;
