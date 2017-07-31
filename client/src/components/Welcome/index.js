import React from "react";
import { connect } from "react-redux";
import { logoutAct } from "../../actions";
import FileUploader from "../FileUploader/";

const Welcome = (props) => {
    return (
        <div className="container">
            <h3>Welcome, {props.auth.username}</h3>
            <button className="btn btn-danger" onClick={props.logout}>Logout</button>
            <FileUploader />
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