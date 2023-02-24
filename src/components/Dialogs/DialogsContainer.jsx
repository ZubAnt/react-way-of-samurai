import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import withAuthRedirect from "../hoc/withAuthRedirect";
import {compose} from "redux";
import {sendMessage} from "../../redux/dialogs-reducer";


const mapStateToProps = (state) => {
    return {
        state: state.messagesPage,
    }
}

const mapDispatchToProps = {
    sendMessage
}


export default compose(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps),
)(Dialogs)


