import React, {Component} from 'react';
import {connect} from 'react-redux';
import {TextField, RaisedButton, Snackbar, Paper} from 'material-ui';

import TeamList from './TeamList';
import { createTeam } from '../../api/team';

class AddTeam extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    };

    state = {
        success: false,
    };

    addTeam() {
        const data = {
            name: this.refs.name.getValue(),
            project: this.refs.project.getValue(),
            teamMembers: this.mapTeamListToUserData()
        };

        createTeam(data)
            .then(response => this.setState(response.data))
            .then(() => setTimeout(() => this.context.router.push('/dashboard'), 2000))
            .catch(error => console.log);
    }

    mapTeamListToUserData() {
        return this.props.teamlist.map((user) => ({
            _id: user.value
        }));
    }

    render() {
        return (
            <Paper className="page team">
                <h4>Create team</h4>

                <TextField
                    ref='name'
                    floatingLabelText='Team name'
                    multiLine={false}
                    fullWidth={true}
                />
                <TextField
                    ref='project'
                    floatingLabelText='Project'
                    multiLine={false}
                    fullWidth={true}
                />

                <TeamList />

                <div className="team-controls">
                    <RaisedButton
                        primary={true}
                        label="Create team"
                        onClick={()=> this.addTeam()}/>
                </div>
                <Snackbar
                    open={this.state.success}
                    message="Team created"
                    autoHideDuration={1800}
                />
            </Paper>
        );
    }
}

const mapStateToProps = state => ({
    teamlist: state.team
});


export default connect(mapStateToProps)(AddTeam);
