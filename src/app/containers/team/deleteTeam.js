import React, {Component} from 'react';
import {Table, TableBody, TableRowColumn, TableHeader, TableHeaderColumn, TableRow, Paper} from 'material-ui';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import {listTeams, deleteTeam} from '../../api/team';
import DialogModal from '../../components/dialog';

class ListTeamOrganization extends Component {

    state = {};

    componentWillMount() {
        listTeams()
            .then(({data}) => this.setState(data));
    }

    deleteTeam(team) {
        this.setState({
            deleteTeam: true,
            team
        })
    }

    confirmDeleteTeam() {
        deleteTeam(this.state.team).then(({data}) => {
            this.setState({ ...data,
                deleteTeam: false
            })
        });
    }

    renderTeam(team) {
        return (
            <TableRow key={team._id}>
                <TableRowColumn>{team.name}</TableRowColumn>
                <TableRowColumn className="team-list__action">
                    <DeleteIcon onClick={() => this.deleteTeam(team)}/>
                </TableRowColumn>
            </TableRow>
        );
    }

    renderTeamList() {
        return this.state.teams.map((team) => this.renderTeam(team));
    }

    renderModal() {
        if (this.state.deleteTeam) {
            return <DialogModal
                message={`Are you sure you want to delete: ${this.state.team.name}`}
                confirmLabel="Delete"
                onCancel={()=> this.setState({deleteTeam: false})}
                onConfirmHandler={() => this.confirmDeleteTeam}
            />;
        }
    }

    render() {
        if (!this.state.teams) {
            return <div>Loading...</div>;
        }

        return (
            <Paper className="page team-list">
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn className="team-list__label">Team</TableHeaderColumn>
                            <TableHeaderColumn className="team-list__action">Action</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {this.renderTeamList()}
                    </TableBody>
                </Table>
                { this.renderModal() }
            </Paper>
        );
    }
}
export default ListTeamOrganization;
