import React from 'react'
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, setProfile, showProfileById, updateStatus} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import Redirect from "react-router-dom/Redirect";


class ProfileContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {redirectToLogin: false};
    }

    getProfile() {
        let userId = this.props.match.params.userId;
        if (!userId && this.props.me) {
            userId = this.props.me.id
        }
        if (!userId) {
            this.setState({redirectToLogin: true})
        }
        this.controller = new AbortController();
        this.props.showProfileById(userId, this.controller.signal)
        this.props.getStatus(userId, this.controller.signal)
    }

    componentDidMount() {
       this.getProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.getProfile()
        }
    }

    componentWillUnmount() {
        this.controller.abort()
    }

    render() {
        if (this.state.redirectToLogin) {
            debugger;
            return <Redirect to='/login'/>
        }

        return (<Profile
            profile={this.props.profile}
            me={this.props.me}
            status={this.props.status}
            updateStatus={this.props.updateStatus}
        />)
    }
}

const mapStateToProps = (state) => {
    return {
        me: state.auth.me,
        profile: state.profilePage.profile,
        status: state.profilePage.status,
    }
}

export default compose(
    connect(
        mapStateToProps,
        {
            setProfile,
            showProfileById,
            getStatus,
            updateStatus,
        }
    ),
    withRouter,
)(ProfileContainer)
