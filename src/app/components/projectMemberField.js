import React, {Component} from 'react';
import {AutoComplete} from 'material-ui';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import {TableRow, TableRowColumn} from 'material-ui';

class ProjectMemberField extends Component {

    render() {
        return (

            <TableRow>
                <TableRowColumn>
                    <AutoComplete
                        name="dasdsad"
                        hintText={`${this.props.text}`}
                        id={`${this.props.id}`}
                        dataSource={this.props.users}
                        onNewRequest={(e) => this.props.onChange(e, this.props.id)}
                        fullWidth={true}
                    />
                </TableRowColumn>
                <TableRowColumn>
                    <DeleteIcon onClick={() => this.props.handleRemove(this.props.id) }/>
                </TableRowColumn>
            </TableRow>);
    }
}
export default ProjectMemberField;
