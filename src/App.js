import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {fetchUser} from "./actions";

class App extends React.Component {
    componentWillMount() {
        this.props.fetchUser();
    }
    render() {
        return (
            <h1>APP</h1>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUser: () => {
            return dispatch(fetchUser());
        }
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));