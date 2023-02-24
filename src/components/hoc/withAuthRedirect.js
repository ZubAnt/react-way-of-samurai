import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        me: state.auth.me
    }
}

const  withAuthRedirect = (Component) => {
    let wrapped = (props) => {
        if (!props.me) {
            return (
                <Redirect to="/login"/>
            )
        }
        return <Component {...props}/>
    }
    return connect(mapStateToProps)(wrapped)
}


export default withAuthRedirect;
