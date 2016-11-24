import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, RaisedButton} from 'material-ui';

import {addTeamFieldAction, removeTeamFieldAction, updateTeamFieldAction} from '../../reducers/team';
import {getUsers} from '../../api/user';
import ProjectMemberField from '../../components/projectMemberField';

/**
 * Renders a table of project member fields with autocomplete functionality
 */
class TeamList extends Component {

    state = {};

    componentWillMount() {
        getUsers('all').then(response => {
            this.setState({users: response.data});
        }, (err) => {
            console.log('err: getUsers::ALL');
        });
    }

    /**
     * Maps all users to the correct format for the autocomplete component
     *
     * @returns {Array}
     */
    getAutoCompleteSource() {
        return this.state.users.map((user) => ({
            text: `${user.name} ${user.lastname} - (${user.email})`,
            value: user._id
        }));
    }

    renderProjectMemberFields(field) {
        return (
            <ProjectMemberField
                {...field}
                key={field.id}
                users={this.getAutoCompleteSource()}
                onChange={this.props.updateProjectMemberField}
                handleRemove={this.props.removeProjectMemberField}
            />
        );
    }

    /**
     * Generate an array of ProjectMemberFields
     *
     * @returns {Array|*}
     */
    memberList() {
        return this.props.teamMemberField.map((field) => this.renderProjectMemberFields(field));
    }

    render() {
        if (!this.state.users) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <Table className="teamlist">
                    <TableHeader style={{
                        backgroundColor: '#424242'
                    }} displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn style={{
                                fontSize: '16px'
                            }}>Teammembers</TableHeaderColumn>
                            <TableHeaderColumn style={{
                                width: '30%',
                                fontSize: '16px',
                                textAlign: 'center'
                            }}>Action</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        { this.memberList() }
                    </TableBody>
                </Table>

                <RaisedButton
                    primary={true}
                    label="Add team member"
                    onClick={this.props.addProjectMemberField}/>
            </div>
        );
    }
}

/**
 * Dispatch actions
 *
 * @param dispatch
 */
const mapDispatchToProps = dispatch => ({

    /**
     * Add new project member field
     */
    addProjectMemberField() {
        dispatch(addTeamFieldAction());
    },

    /**
     * Adds a chosen user to the team reducer.
     * the chosen is an object: { text: 'username', value: 'userid' }
     *
     * @param chosenTeamMember
     * @param id field id
     */
    updateProjectMemberField(chosenTeamMember, id) {
        dispatch(updateTeamFieldAction({ ...chosenTeamMember, id }));
    },

    /**
     * Removes project member field
     * @param id project member field id
     */
    removeProjectMemberField(id) {
        dispatch(removeTeamFieldAction(id));
    }
});

const mapStateToProps = state => ({
    teamMemberField: state.team
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamList);
