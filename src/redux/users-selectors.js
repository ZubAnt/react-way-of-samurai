import {createSelector} from "reselect";

const getUsers = (state) => {
    return state.usersPage.users
}

export const getUsersSelector = createSelector(getUsers, (users) => {
    return users.filter(v => true)
})