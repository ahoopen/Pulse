import React, {Component} from 'react';
import {connect} from 'react-redux';
import {TextField, RaisedButton, Snackbar, Paper} from 'material-ui';

import TeamList from './TeamList';

class AddTeam extends Component {

    state = {
        success: false,
    };

    addTeam() {
        // this.setState({ loading: true });

        const data = {
            name: this.refs.name.getValue()
        };

        console.log(this.state, this.props.teamlist);
        // createTeam(data).then(response => {
        //     this.setState(response.data);
        // });
    }

    render() {
        return (
            <Paper className="page team">
                <h4>Create team</h4>
                <form>
                    <TextField
                        id="1"
                        ref='name'
                        floatingLabelText='Team name'
                        multiLine={false}
                        fullWidth={true}
                    />
                    <TextField
                        id="2"
                        ref='project'
                        floatingLabelText='Project'
                        multiLine={false}
                        fullWidth={true}
                    />
                </form>


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
