import {getMe} from "./auth-reducer";

const ACTION_TYPE_APP_INITIALIZED_SUCCESS = 'ACTION_TYPE_APP_INITIALIZED_SUCCESS';

let initialState = {
    initialized: false,
}

export const setAppInitializedSuccess = () => {return {type: ACTION_TYPE_APP_INITIALIZED_SUCCESS}}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPE_APP_INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
}

export const initialize = (signal) => async (dispatch) => {
    const data = await dispatch(getMe(signal));
    if (data !== undefined) {
        dispatch(setAppInitializedSuccess())
    }
}

export default appReducer