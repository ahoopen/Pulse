import React, {Component} from 'react';

import {
    Step,
    Stepper,
    StepLabel,
    Paper
} from 'material-ui';

import AccountFields from './accountFields';
import UserFields from './userFields';
import Confirmation from './confirmation';
import Success from './success';

class Registration extends Component {

    constructor(props) {
        super(props);

        this.state = {
            step: 0
        };
    }

    fieldValues = {
        name: null,
        email: null,
        password: null
    };

    nextStep() {
        const { step } = this.state;

        this.setState({
            step: step + 1
        });
    }

    previousStep() {
        this.setState({
            step: this.state.step - 1
        });
    }

    saveValues(field_value) {
        this.fieldValues = { ...this.fieldValues, ...field_value };
    }

    submitRegistration() {
        console.log(this.fieldValues);

        this.nextStep();
    }

    getStepContent() {
        switch (this.state.step) {
            case 0:
                return <AccountFields
                    fieldValues={this.fieldValues}
                    nextStep={this.nextStep.bind(this)}
                    previousStep={this.previousStep.bind(this)}
                    saveValues={this.saveValues.bind(this)} />;
            case 1:
                return <UserFields
                    fieldValues={this.fieldValues}
                    nextStep={this.nextStep.bind(this)}
                    previousStep={this.previousStep.bind(this)}
                    saveValues={this.saveValues.bind(this)} />;
            case 2:
                return <Confirmation
                    fieldValues={this.fieldValues}
                    nextStep={this.nextStep.bind(this)}
                    previousStep={this.previousStep.bind(this)}
                    submitRegistration={this.submitRegistration.bind(this)}
                    />;
            case 3:
                return <Success
                    fieldValues={this.fieldValues}
                />;
            default:
                return;
        }
    }

    render() {
        return (
            <Paper className="registration">
                <Stepper activeStep={this.state.step}>
                    <Step>
                        <StepLabel>Create account</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>User details</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Confirmation</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Complete registration</StepLabel>
                    </Step>
                </Stepper>
                {this.getStepContent()}
            </Paper>
        );
    }
}
export default Registration;
