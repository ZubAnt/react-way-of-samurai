import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import NewMessageForm from "./NewMessageForm/NewMessageForm";


export default ({state, sendMessage}) => {
    let dialogsElements = state.dialogs.map(dialog => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id}/>)
    let messagesElements = state.messages.map(message => <Message message={message.message} key={message.id}
                                                                  id={message.id}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <NewMessageForm sendMessage={sendMessage}/>
            </div>
        </div>
    )
}
