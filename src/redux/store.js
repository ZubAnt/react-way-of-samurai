import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";


let postCnt = 0
let posts = [
    {'id': ++postCnt, 'message': 'post 1', 'like_cnt': 1},
    {'id': ++postCnt, 'message': 'post 2', 'like_cnt': 2},
    {'id': ++postCnt, 'message': 'post 3', 'like_cnt': 3},
    {'id': ++postCnt, 'message': 'post 4', 'like_cnt': 4},
    {'id': ++postCnt, 'message': 'post 5', 'like_cnt': 5},
]
let dialogCnt = 0
let dialogs = [
    {'id': ++dialogCnt, 'name': 'Dima 1'},
    {'id': ++dialogCnt, 'name': 'Dima 2'},
    {'id': ++dialogCnt, 'name': 'Dima 3'},
    {'id': ++dialogCnt, 'name': 'Dima 4'},
    {'id': ++dialogCnt, 'name': 'Dima 5'},
    {'id': ++dialogCnt, 'name': 'Dima 6'},
]
let messageCnt = 0
let messages = [
    {'id': ++messageCnt, 'message': 'message 1', 'dialogId': 1},
    {'id': ++messageCnt, 'message': 'message 2', 'dialogId': 1},
    {'id': ++messageCnt, 'message': 'message 3', 'dialogId': 1},
    {'id': ++messageCnt, 'message': 'message 4', 'dialogId': 1},
    {'id': ++messageCnt, 'message': 'message 5', 'dialogId': 1},
]


let store = {

    _state: {
        profilePage: {
            posts: posts,
            newPostText: ''
        },
        messagesPage: {
            dialogs: dialogs,
            messages: messages,
            newMessageBody: '',
        },
        sidebar: {}
    },

    _callSubscriber: (state) => {
        console.log('State was changed');
    },

    getState() {
        return this._state;
    },


    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.messagesPage = dialogsReducer(this._state.messagesPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)
        this._callSubscriber(this._state);
    },

    subscribe(observer) {
        this._callSubscriber = observer
    }
}

export default store;
