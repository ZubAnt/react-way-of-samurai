import s from './Login.module.css'
import {getCaptchaUrl, login} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import LoginForm from "./LoginForm/LoginForm";
import {Redirect} from "react-router-dom";


const Login = (props) => {
    if (props.me) {
        return (
            <Redirect to={'/profile/' + props.me.id} />
        )
    }

    return (
        <div className={s.loginBlock}>
            <LoginForm login={props.login} getCaptchaUrl={props.getCaptchaUrl}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        me: state.auth.me
    }
}

export default connect(mapStateToProps, {
    login,
    getCaptchaUrl,
})(Login)