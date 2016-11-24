import React, { Component } from 'react';
import {Drawer, MenuItem, Divider } from 'material-ui';
import GroudAddIcon from 'material-ui/svg-icons/social/group-add';
import DeleteIcon from 'material-ui/svg-icons/content/clear';
import EditIcon from 'material-ui/svg-icons/content/create';

class NavigationMenu extends Component {

    render() {
        return (
            <Drawer docked={false} open={this.props.open} onRequestChange={(open) => this.props.toggleNavigation({open})}>
                <MenuItem>Team</MenuItem>
                <Divider />
                <MenuItem
                    onClick={() => this.props.onClickHandler('/team/add')}
                    leftIcon={<GroudAddIcon />}>
                    Add team
                </MenuItem>
                <MenuItem
                    onClick={() => this.props.onClickHandler('/team/update')}
                    leftIcon={<EditIcon />}>Update team</MenuItem>
                <MenuItem
                    onClick={() => this.props.onClickHandler('/team/delete')}
                    leftIcon={<DeleteIcon />}>Remove team</MenuItem>
                <Divider />
            </Drawer>
        );
    }
}
export default NavigationMenu
