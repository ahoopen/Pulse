import React, {Component} from 'react';
import {connect} from 'react-redux';

import {AppCanvas, AppBar, Styles, FlatButton, Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui';

class Dashboard extends Component {

    render() {
        return (
            <div>
                <AppBar title={`Support Ticket Manager`}
                        iconElementRight={ <FlatButton label="Debug" /> }/>
                <Toolbar>
                    <ToolbarGroup key={1}>
                        <ToolbarTitle text="henk"/>
                    </ToolbarGroup>
                </Toolbar>
                <div id="page">
                    dit is het dashboard
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(
    mapStateToProps
)(Dashboard);
