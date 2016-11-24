import React, {Component} from 'react';
import {Dialog, RaisedButton, FlatButton} from 'material-ui';

class DialogModal extends Component {

    state = {
        open: true,
    };

    handleClose = () => {
        this.setState({open: false});
        this.props.onCancel();
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                primary={true}
                label={this.props.confirmLabel}
                onTouchTap={this.props.onConfirmHandler}
            />,
        ];

        return (
            <Dialog
                title="Delete team"
                actions={actions}
                modal={true}
                open={this.state.open}
            >
                {this.props.message}
            </Dialog>
        );
    }
}
export default DialogModal;
