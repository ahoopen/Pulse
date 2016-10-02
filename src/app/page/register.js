import React from 'react';
import {
    Card,
    TextField
} from 'material-ui';


class Register extends React.Component {


    render() {
        return (
            <Card>
                <TextField
                    ref='username'
                    floatingLabelText='Username'
                    multiLine={false}
                    fullWidth={true}/>
                <TextField
                    ref='username'
                    floatingLabelText='Username'
                    multiLine={false}
                    fullWidth={true}/>
            </Card>
        );
    }
}

export default Register;
