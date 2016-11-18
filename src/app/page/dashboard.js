import React, {Component} from 'react';
import {connect} from 'react-redux';

// import Projects from '../components/projects';
import DashboardBody from '../components/dashboard';

class Dashboard extends Component {

    render() {
        return (
            <div className="page">
                <DashboardBody />
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
