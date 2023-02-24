import React from 'react'
import {connect} from "react-redux";
import Users from "./Users";
import {follow, getUsers, setCurrentPage, unfollow} from "../../redux/users-reducer";
import Preloader from "../Common/Preloader/Preloader";
import {compose} from "redux";
import {getUsersSelector} from "../../redux/users-selectors";


class UserContainer extends React.Component {

    componentDidMount() {
        this.controller = new AbortController();
        this.props.getUsers(this.props.currentPage, this.props.pageSize, this.controller.signal)
    }

    componentWillUnmount() {
        this.controller.abort()
    }

    onChangePage(pageNumber) {
        this.controller.abort()
        this.controller = new AbortController()
        this.props.setCurrentPage(pageNumber)
        this.props.getUsers(pageNumber, this.props.pageSize, this.controller.signal)
    }


    render() {
        return (<>
                {this.props.isFetching ? <Preloader/> : <Users
                    isFetching={this.props.isFetching}
                    followingInProgress={this.props.followingInProgress}
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    onChangePage={this.onChangePage.bind(this)}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    me={this.props.me}
                />}
            </>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        users: getUsersSelector(state),
        totalUsersCount: state.usersPage.totalUsersCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
        me: state.auth.me,
    }
}


export default compose(
    connect(
        mapStateToProps,
        {
            follow,
            unfollow,
            setCurrentPage,
            getUsers,
        }
    )
)(UserContainer)
