import React, { Component } from 'react';
import {connect} from 'react-redux';
import { UserLogout } from '../actions/user.action';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';

class Logged extends Component {

    logout() {
        this.props.logout();
    }

    render() {
        return (
            <IconMenu
                iconButtonElement={
                    <IconButton><MoreVertIcon /></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <MenuItem primaryText="Refresh"/>
                <MenuItem primaryText="Help"/>
                <MenuItem primaryText="Sign out" onClick={() => this.logout()}/>
            </IconMenu>
        );
    }

}

const mapDispatchToProps = (dispatch) => ({
    logout: () => {
        dispatch(UserLogout());
    }
});

export default connect(
    (state) => state,
    mapDispatchToProps
)(Logged);

