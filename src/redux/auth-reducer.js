import sdk from "../api/api";
import axios from "axios";

const ACTION_TYPE_AUTH_SET_ME = 'ACTION_TYPE_AUTH_SET_ME';
const ACTION_TYPE_AUTH_SET_CAPTCHA_URL = 'ACTION_TYPE_AUTH_SET_CAPTCHA_URL';


let initialState = {
    me: null,
    isFetching: true,
    captchaUrl: null,
}

export const setMe = (me) => {return {type: ACTION_TYPE_AUTH_SET_ME, me: me}}

export const setCaptchaUrl = (url) => {return {type: ACTION_TYPE_AUTH_SET_CAPTCHA_URL, url: url}}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPE_AUTH_SET_ME:
            return {
                ...state,
                me: action.me,
            };
        case ACTION_TYPE_AUTH_SET_CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: action.url,
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


export const login = (email, password, rememberMe, captcha, signal) => async (dispatch) => {
    const data = await sdk.auth.login(email, password, rememberMe, captcha, signal);
    if (data.resultCode === 0) {
        dispatch(getMe())
        dispatch(setCaptchaUrl(null))
    } else if (data.resultCode === 10) {
        const data = await sdk.security.getCaptchaUrl();
        dispatch(setCaptchaUrl(data.url))
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