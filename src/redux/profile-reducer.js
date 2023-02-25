import sdk from "../api/api";
import axios from "axios";

const ADD_POST = 'ADD-POST';
const ACTION_TYPE_PROFILE_SET_PROFILE = 'ACTION_TYPE_PROFILE_SET_PROFILE';
const ACTION_TYPE_PROFILE_SET_STATUS = 'ACTION_TYPE_PROFILE_SET_STATUS';
const ACTION_TYPE_PROFILE_SAVE_PHOTO_SUCCESS = 'ACTION_TYPE_PROFILE_SAVE_PHOTO_SUCCESS';

let postCnt = 0;
let posts = [
    {'id': ++postCnt, 'message': 'post 1', 'like_cnt': 1},
    {'id': ++postCnt, 'message': 'post 2', 'like_cnt': 2},
    {'id': ++postCnt, 'message': 'post 3', 'like_cnt': 3},
    {'id': ++postCnt, 'message': 'post 4', 'like_cnt': 4},
    {'id': ++postCnt, 'message': 'post 5', 'like_cnt': 5},
]

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText})


export const setProfile = (profile) => ({type: ACTION_TYPE_PROFILE_SET_PROFILE, profile: profile})

export const setStatus = (status) => ({type: ACTION_TYPE_PROFILE_SET_STATUS, status: status})

export const savePhotoSuccess = (photos) => ({type: ACTION_TYPE_PROFILE_SAVE_PHOTO_SUCCESS, photos: photos})

let initialState = {
    posts: posts,
    profile: null,
    status: '',
}

const profileReducer = (state = initialState, action) => {

    // eslint-disable-next-line default-case
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [
                    ...state.posts,
                    {
                        'id': ++postCnt,
                        'message': action.newPostText,
                        'like_cnt': 0,
                    }
                ],
            }
        case ACTION_TYPE_PROFILE_SET_PROFILE:
            return {...state, profile: action.profile}
        case ACTION_TYPE_PROFILE_SET_STATUS:
            return {...state, status: action.status}
        case ACTION_TYPE_PROFILE_SAVE_PHOTO_SUCCESS:
            return {...state, profile: {...state.profile, photos: action.photos}}
    }
    return state
}

export const showProfileById = (userId, signal) => async (dispatch) => {
    try {
        const data = await sdk.profile.getByUserId(userId, signal);
        dispatch(setProfile(data))
    } catch (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        } else {
            // handle error
        }
    }
}

export const getStatus = (userId, signal) => async (dispatch) => {
    try {
        const status = await sdk.profile.status.getByUserId(userId, signal);
        dispatch(setStatus(status))
    } catch (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        } else {
            // handle error
        }
    }
}

export const updateStatus = (status) => async (dispatch) => {
    try {
        const data = await sdk.profile.status.update(status)
        if (data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    } catch (thrown) {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message);
        } else {
            // handle error
        }
    }
}

export const savePhoto = (file) => async (dispatch) => {
    const response = await sdk.profile.photo.upload(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const addPost = (newPostText) => (dispatch) => {
    dispatch(addPostActionCreator(newPostText))
}

export default profileReducer