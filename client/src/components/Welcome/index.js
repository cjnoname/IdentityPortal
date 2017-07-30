import React from "react";
import { connect } from "react-redux";
import { logoutAct } from "../../actions"

const Welcome = (props) => {
    return (
        <div>
            <h3>Welcome, {props.username}</h3>
            <button className="btn btn-danger" onClick={props.logout}>Logout</button>
        </div>
    );
}

function mapStateToProps (state) {
    return {
        auth: state.auth
    }
}

function mapDispatchToProps (dispatch) {
    return {
        logout: () => dispatch(logoutAct())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);