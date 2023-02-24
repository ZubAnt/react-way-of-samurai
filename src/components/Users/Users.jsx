import classes from './Users.module.css'
import avatar from '../../assets/images/avatar.png'
import React from 'react'
import {NavLink} from "react-router-dom";
import {Paginator} from "../Common/Paginator/Paginator";


const FollowButton = ({user, unfollow, follow, followingInProgress}) => {
    return (
        <div>{
            user.followed
                ? <button
                    onClick={() => unfollow(user.id)}
                    disabled={followingInProgress.some(userId => userId === user.id)}
                >unfollow</button>
                : <button
                    onClick={() => follow(user.id)}
                    disabled={followingInProgress.some(userId => userId === user.id)}
                > follow</button>
        }</div>
    )
}


let Users = ({
                 totalUsersCount,
                 pageSize,
                 currentPage,
                 users,
                 onChangePage,
                 follow,
                 unfollow,
                 me,
                 followingInProgress,

             }) => {
    return (
        <div>
            <Paginator
                current={currentPage}
                total={totalUsersCount}
                size={pageSize}
                onPageChange={onChangePage}
            />
            {
                users.map((user) => {
                    return (
                        <div key={user.id}>
                        <span>
                            <div>
                                <NavLink to={'/profile/' + user.id}>
                                    <img className={classes.avatar}
                                         src={user.photos.small ? user.photos.small : avatar}/>
                                  </NavLink>

                            </div>
                            {me ? <FollowButton
                                user={user}
                                follow={follow}
                                unfollow={unfollow}
                                followingInProgress={followingInProgress}
                            /> : null}
                </span>
                            <span>
                            <span>
                                <div>{user.name}</div>
                                <div>{user.status}  </div>
                            </span>
                            <span>
                                {/*<div>{user.location.country}</div>*/}
                                {/*<div>{user.location.city}</div>*/}
                            </span>
                        </span>
                        </div>
                    )
                })
            }</div>
    )
}

export default Users