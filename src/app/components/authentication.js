import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * Check if the user is authenticated
 * if not redirect to the home page
 *
 * @param ComposedComponent
 * @returns {*}
 */
export default function (ComposedComponent) {
    class Authentication extends Component {

        static contextTypes = {
            router: React.PropTypes.object
        };

        componentWillMount() {
            if (!this.props.authenticated) {
                this.context.router.push('/');
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                this.context.router.push('/');
            }
        }

        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    function mapStateToProps(state) {
        return {
            authenticated: state.user.isAuthenticated
        };
    }

    return connect(mapStateToProps)(Authentication);
}
