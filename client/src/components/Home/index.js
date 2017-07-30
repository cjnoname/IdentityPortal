import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../Header";

import { autoLoginAct } from "../../actions/index";

class Home extends Component {
    componentDidMount () {
        this.props.autoLogin();
    }
    render() {
        console.log("from home: ", this.props)
        return (
            <div className="container-fluid">
                <Header />
                { this.props.auth.token && <div>{this.props.auth.token}</div>}
                { this.props.auth.message && <div>Error: {this.props.auth.message}</div>}
                { this.props.auth.username && <div>Welcome { this.props.auth.username }</div>}
                { this.props.children }
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        auth: state.auth
    };
}

function mapDispatchToProps (dispatch) {
    return {
        autoLogin: () => dispatch(autoLoginAct())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
