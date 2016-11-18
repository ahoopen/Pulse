import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, RaisedButton} from 'material-ui';

import {addTeamFieldAction, removeTeamFieldAction} from '../../reducers/team';
import {getUsers} from '../../api/user';
import ProjectMemberField from '../../components/projectMemberField';

/**
 * Renders a table of project member fields with autocomplete functionality
 */
class TeamList extends Component {

    state = {
        teamMembers: []
    };

    componentWillMount() {
        getUsers('all').then(response => {
            this.setState({users: response.data});
        }, (err) => {
            console.log('err: getUsers::ALL');
        });
    }

    /**
     * Add a new team member field.
     * A redux action triggers a increase of fields
     */
    addTeamMemberField() {
        this.props.addProjectMemberField();
    }

    /**
     * Adds a chosem user to the members array.
     * the chosen is an object: { text: 'username', value: 'userid' }
     *
     * @param chosenTeamMember
     */
    addMemberToList(chosenTeamMember) {
        const teamMembers = [...this.state.teamMembers, chosenTeamMember];
        this.setState({teamMembers});
    }

    /**
     * Removes a member field and updates the redux state
     *
     * @param memberId
     */
    removeMemberFromList(memberId) {
        const teamMembers = [
            ...this.state.teamMembers.slice(0, memberId),
            ...this.state.teamMembers.slice(memberId + 1)
        ];

        this.props.removeProjectMemberField(memberId);
        this.setState({teamMembers});
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
                key={field.id}
                users={this.getAutoCompleteSource()}
                field={field}
                onChange={this.addMemberToList.bind(this)}
                handleRemove={this.removeMemberFromList.bind(this)}
            />
        );
    }

    /**
     * Generate an array of ProjectMemberFields
     *
     * @returns {Array|*}
     */
    memberList() {
        return this.props.projectMemberFields.map((field) => this.renderProjectMemberFields(field));
    }

    render() {
        if (!this.state.users) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Team member</TableHeaderColumn>
                            <TableHeaderColumn>Action</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        { this.memberList() }
                    </TableBody>
                </Table>
                <RaisedButton
                    primary={true}
                    label="Add team member"
                    onClick={()=> this.addTeamMemberField()}/>
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

    addProjectMemberField() {
        dispatch(addTeamFieldAction());
    },

    removeProjectMemberField(index) {
        dispatch(removeTeamFieldAction(index));
    }
});

const mapStateToProps = state => ({
    projectMemberFields: state.team
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamList);
