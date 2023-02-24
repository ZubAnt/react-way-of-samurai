import axios from "axios";
import sdk from "../api/api";

const ACTION_TYPE_FOLLOW = 'USERS_FOLLOW'
const ACTION_TYPE_UNFOLLOW = 'USERS_UNFOLLOW'
const ACTION_TYPE_SET_FOLLOWING_IN_PROGRESS = 'USERS_SET_IS_FOLLOWING_IN_PROGRESS'
const ACTION_TYPE_SET_USERS = 'USERS_SET_USERS'
const ACTION_TYPE_SET_CURRENT_PAGE = 'USERS_SET_CURRENT_PAGE'
const ACTION_TYPE_SET_TOTAL_USERS_COUNT = 'USERS_SET_TOTAL_USERS_COUNT'
const ACTION_TYPE_SET_IS_FETCHING = 'USERS_SET_FETCHING'

let initialState = {
    users: [],
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
}

export const followSuccess = (userId) => {
    return {type: ACTION_TYPE_FOLLOW, userId: userId}
}

export const unfollowSuccess = (userId) => {
    return {type: ACTION_TYPE_UNFOLLOW, userId: userId}
}

export const setFollowingInProgress = (isFetching, userId) => {
    return {type: ACTION_TYPE_SET_FOLLOWING_IN_PROGRESS, isFetching: isFetching, userId: userId}
}

export const setUsers = (users) => {
    return {type: ACTION_TYPE_SET_USERS, users: users}
}

export const setCurrentPage = (currentPage) => {
    return {type: ACTION_TYPE_SET_CURRENT_PAGE, currentPage: currentPage}
}

export const setTotalUsersCount = (totalUsersCount) => {
    return {type: ACTION_TYPE_SET_TOTAL_USERS_COUNT, totalUsersCount: totalUsersCount}
}

export const setIsFetching = (isFetching) => {
    return {type: ACTION_TYPE_SET_IS_FETCHING, isFetching: isFetching}
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPE_FOLLOW:
            return {
                ...state,
                users: state.users.map(
                    element => {
                        if (element.id === action.userId) {
                            return {...element, followed: true}
                        }
                        return element
                    }
                )
            };
        case ACTION_TYPE_UNFOLLOW:
            return {
                ...state,
                users: state.users.map(
                    element => {
                        if (element.id === action.userId) {
                            return {...element, followed: false}
                        }
                        return element
                    }
                )
            };
        case ACTION_TYPE_SET_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(userId => userId !== action.userId)
            };
        case ACTION_TYPE_SET_USERS:
            return {...state, users: [...action.users]};
        case ACTION_TYPE_SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage};
        case ACTION_TYPE_SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount};
        case ACTION_TYPE_SET_IS_FETCHING:
            return {...state, isFetching: action.isFetching};
        default:
            return state;
    }
}

export const getUsers = (page, count, signal) => async (dispatch) => {
    dispatch(setIsFetching(true))
    try {
        const data = await sdk.getUsers(page, count, signal)
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
        dispatch(setIsFetching(false))
    } catch (thrown) {
        dispatch(setIsFetching(false))
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        } else {
            // handle error
        }
    }
}

export const follow = (userId) => async (dispatch) => {
    dispatch(setFollowingInProgress(true, userId))
    try {
        const data = await sdk.follow(userId)
        dispatch(setFollowingInProgress(false, userId))
        if (data.resultCode === 0) {
             dispatch(followSuccess(userId))
        }
    } catch (thrown) {
        dispatch(setFollowingInProgress(false, userId))
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        } else {
            // handle error
        }
    }
}

export const unfollow = (userId) => async (dispatch) => {
    dispatch(setFollowingInProgress(true, userId))
    try {
        const data = await sdk.unfollow(userId)
        dispatch(setFollowingInProgress(false, userId))
        if (data.resultCode === 0) {
             dispatch(unfollowSuccess(userId))
        }
    } catch (thrown) {
        dispatch(setFollowingInProgress(false, userId))
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        } else {
            // handle error
        }
    }
}


export default usersReducer