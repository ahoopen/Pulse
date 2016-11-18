import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
    AutoComplete,
    TextField,
    RaisedButton,
    Snackbar
} from 'material-ui';

// import {createTeam} from '../../api/team';
// import {getUsers} from '../../api/user';
// import MemberItem from '../../components/member-item';
import TeamList from './TeamList';

import {addTeamFieldAction, removeTeamFieldAction} from '../../reducers/team';

class AddTeam extends Component {

    state = {
        success: false,
        loading: false,
        members: []
    };

    // componentWillMount() {
    //     getUsers('all').then(response => {
    //         this.setState({
    //             users: response.data
    //         });
    //     }, (err) => {
    //         console.log('err: getUsers::ALL');
    //     })
    // }

    addTeam() {
        this.setState({ loading: true });

        const data = {
            name: this.refs.name.getValue()
        };

        console.log(this.state);
        // createTeam(data).then(response => {
        //     this.setState(response.data);
        // });
    }

    // addItem() {
    //     this.props.incrementTeamField();
    // }
    //
    // handleOnChange(chosenUser) {
    //     this.setState({
    //         members: [...this.state.members, chosenUser]
    //     });
    // }
    //
    // handleRemoveItem(memberId) {
    //     this.props.decrementTeamField(memberId);
    //
    //     this.setState({
    //         members: [
    //             ...this.state.members.slice(0, memberId),
    //             ...this.state.members.slice(memberId + 1)
    //         ]
    //     });
    // }
    //
    // getItems() {
    //     const users = this.state.users.map((user) => ({
    //         text: `${user.name} ${user.lastname} - (${user.email})`,
    //         value: user._id
    //     }));
    //
    //     return this.props.teamFields.map((field) => {
    //         return <MemberItem key={field.id}
    //                            users={users}
    //                            field={field}
    //                            onChange={this.handleOnChange.bind(this)}
    //                            handleRemove={this.handleRemoveItem.bind(this)} />
    //     });
    // }

    render() {
        return (
            <div>
                <TextField
                    id="1"
                    ref='name'
                    floatingLabelText='name'
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

                <TeamList />

                <div className="registration__controls">

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
            </div>
        );
    }
}


export default connect()(AddTeam);



// <Table>
//     <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
//         <TableRow>
//             <TableHeaderColumn>Team member</TableHeaderColumn>
//             <TableHeaderColumn>Action</TableHeaderColumn>
//         </TableRow>
//     </TableHeader>
//     <TableBody displayRowCheckbox={false}>
//         { this.getItems() }
//     </TableBody>
// </Table>
//
//
// <RaisedButton
// primary={true}
// label="add team member"
// onClick={()=> this.addItem()}/>
