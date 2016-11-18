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
                        searchText="placeholde text.."
                        id={`${this.props.field.id}`}
                        dataSource={this.props.users}
                        onNewRequest={this.props.onChange}
                        fullWidth={true}
                    />
                </TableRowColumn>
                <TableRowColumn>
                    <DeleteIcon onClick={() => this.props.handleRemove(this.props.field.id) }/>
                </TableRowColumn>
            </TableRow>);
    }
}
export default ProjectMemberField;
