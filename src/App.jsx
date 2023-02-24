import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Route} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderComponent from "./components/Header/HeaderComponent";
import Login from "./components/Login/Login";
import React from "react";
import {connect, Provider} from "react-redux";
import {initialize} from "./redux/app-reducer";
import Preloader from "./components/Common/Preloader/Preloader";
import store from "./redux/redux-store";
import withSuspense from "./components/hoc/withSuspense";


const ProfileContainer = withSuspense(React.lazy(() => import("./components/Profile/ProfileContainer")));
const DialogsContainer = withSuspense(React.lazy(() => import("./components/Dialogs/DialogsContainer")));


class App extends React.Component {

    componentDidMount() {
        this.controller = new AbortController();
        this.props.initialize(this.controller.signal)
    }

    componentWillUnmount() {
        this.controller.abort();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <BrowserRouter>
                <div className="app-wrapper">
                    <HeaderComponent/>
                    <Navbar/>
                    <div className="app-wrapper-content">
                        <Route
                            path='/profile/:userId?'
                            render={
                                (props) => {
                                    return <ProfileContainer/>
                                }
                            }
                        />
                        <Route
                            path='/dialogs'
                            render={
                                (props) => {
                                    return <DialogsContainer/>
                                }
                            }
                        />
                        <Route
                            path='/users'
                            render={
                                (props) => {
                                    return <UsersContainer/>
                                }
                            }
                        />
                        <Route
                            path='/login'
                            render={
                                (props) => {
                                    return <Login/>
                                }
                            }
                        />
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized,
        me: state.auth.me,
    }
}


const AppContainer = connect(
    mapStateToProps,
    {
        initialize
    }
)(App)


const WrappedAppContainer = (props) => {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </React.StrictMode>
    )
}

export default WrappedAppContainer