import s from './Header.module.css'
import NavLink from "react-router-dom/NavLink";

const MeNavLink = ({me, onClick, logout}) => {
    return (
        <NavLink className={s.profileNavLInk} onClick={onClick} to={`/profile/${me.id}`}>
            <div>{me.login}</div>
            <button onClick={() => logout()}>logout</button>
        </NavLink>
    )
}


const LoginNavLink = ({me}) => {
    return (
        <NavLink className={s.loginNavLInk} to='/login'>Login</NavLink>
    )
}


const Header = ({me, showMe, logout}) => {

    return (
        <header className={s.header}>
            <img
                src='https://play-lh.googleusercontent.com/LT5mB212G2wu4JNncPXn9u8UwheLHHRbG-nhKvoZteX4b0WsDO9GCJNjaHYf1J7xjg'
            />
            <div className={s.profileBlock}>
                {me ? <MeNavLink me={me} onClick={showMe} logout={logout}/> : <LoginNavLink/>}
            </div>
        </header>
    )
}
export default Header
