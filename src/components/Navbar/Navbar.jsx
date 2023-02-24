import classes from './Navbar.module.css'
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className={classes.nav}>
            <div>
                <NavLink to='/profile' className={classes.item} activeClassName={classes.activeLink}>Profile</NavLink>
            </div>
            <div>
                <NavLink to='/dialogs' className={classes.item} activeClassName={classes.activeLink}>Messages</NavLink>
            </div>
            <div>
                <NavLink to='/users' className={classes.item} activeClassName={classes.activeLink}>Users</NavLink>
            </div>
            <div className={classes.item}>
                <a>News</a>
            </div>
            <div className={`${classes.item} ${classes.active}`}>
                <a>Music</a>
            </div>
            <div className={classes.item}>
                <a>Settings</a>
            </div>
        </nav>
    )
}
export default Navbar
