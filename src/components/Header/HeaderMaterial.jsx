import s from './Header.module.css'
import NavLink from "react-router-dom/NavLink";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Menu, MenuItem} from "@mui/material";
import Fade from '@mui/material/Fade';


const MeNavLink = ({me, showMe, logout}) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {setAnchorEl(event.currentTarget);};
    const handleClose = () => {setAnchorEl(null);};

    return (
        <div>
            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                color='inherit'
            >
                {me.login}
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                  'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem>
                    <NavLink
                        onClick={() => showMe().then(() => handleClose())}
                        to={`/profile/${me.id}`}>
                        Profile
                    </NavLink>
                </MenuItem>
                <MenuItem onClick={() => logout().then(() => handleClose())}>Logout</MenuItem>
            </Menu>
        </div>
    )
}


const LoginNavLink = ({me}) => {
    return (
        <NavLink className={s.loginNavLInk} to='/login'>Login</NavLink>
    )
}

const HeaderMaterial = ({me, showMe, logout}) => {

    return (
        <Box sx={{flexGrow: 1}} className={s.header}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>

                    </Typography>
                    <div className={s.profileBlock}>
                        {me ? <MeNavLink me={me} showMe={showMe} logout={logout}/> : <LoginNavLink/>}
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
export default HeaderMaterial
