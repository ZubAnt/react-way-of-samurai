import sdk from "../api/api";
import axios from "axios";

const ACTION_TYPE_AUTH_SET_ME = 'ACTION_TYPE_AUTH_SET_ME';

let initialState = {
    me: null,
    isFetching: true,
}

export const setMe = (me) => {return {type: ACTION_TYPE_AUTH_SET_ME, me: me}}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPE_AUTH_SET_ME:
            return {
                ...state,
                me: action.me,
            };
        default:
            return state;
    }
}

export const getMe = (signal) => async (dispatch) => {
    try {
        const data = await sdk.auth.me(signal);
        if (data.resultCode === 0) dispatch(setMe(data.data))
        return data
    } catch (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('[getMe] Request canceled', thrown.message);
        } else {
            // handle error
        }
    }
}

export const login = (email, password, rememberMe, signal) => async (dispatch) => {
    const data = await sdk.auth.login(email, password, rememberMe, signal);
    if (data.resultCode === 0) {
        dispatch(getMe())
    }
    return data
}

export const logout = () => async (dispatch) => {
    const data = await sdk.auth.logout();
    if (data.resultCode === 0) {
        dispatch(setMe(null))
    }
}

export default authReducer