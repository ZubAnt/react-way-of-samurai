const SEND_MESSAGE = 'SEND-MESSAGE';

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


export const sendMessageActionCreator = (message) => (
    {type: SEND_MESSAGE, message: message}
)

let initialState = {
    dialogs: dialogs,
    messages: messages,
}


export const sendMessage = (message) => (dispatch) => {
    dispatch(sendMessageActionCreator(message))
}


const dialogsReducer = (state = initialState, action) => {

    // eslint-disable-next-line default-case
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [
                    ...state.messages, {
                        'id': ++messageCnt,
                        'message': action.message,
                        'dialogId': 1,
                    },
                ],
                newMessageBody: '',
            }
    }

    return state
}
export default dialogsReducer