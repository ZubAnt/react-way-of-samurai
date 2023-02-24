import s from "./DialogItem.module.css";
import {NavLink} from "react-router-dom";

export default (props) => {
    let path = `/dialogs/${props.id}`
    return (
        <div className={s.dialog}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}
