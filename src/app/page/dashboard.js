import React, {Component} from 'react';
import {connect} from 'react-redux';

import Projects from '../components/projects';

class Dashboard extends Component {

    render() {
        return (
            <div className="page">
                <Projects />
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
