import React, {Component} from 'react';
import {connect} from 'react-redux';

class Dashboard extends Component {

    render() {
        return (
            <div>
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
