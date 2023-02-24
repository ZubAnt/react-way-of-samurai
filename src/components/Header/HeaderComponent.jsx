import React from "react";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {showProfileById} from "../../redux/profile-reducer";
import HeaderMaterial from "./HeaderMaterial";

class HeaderComponent extends React.Component {

    render() {
        return (
            <HeaderMaterial
                {...this.props}
                showMe={() => this.props.showProfileById(this.props.me.id)}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        me: state.auth.me,
    }
}

export default connect(
    mapStateToProps,
    {
        showProfileById,
        logout,
    }
)(HeaderComponent)