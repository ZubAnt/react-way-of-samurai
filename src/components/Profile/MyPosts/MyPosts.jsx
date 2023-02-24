import React from "react";
import s from "./MyPosts.module.css"
import Post from "./Post/Post";
import NewPostForm from "./NewPostForm/NewPostForm";


class MyPosts extends React.Component {
    render() {
        let {posts, addPost} = this.props;

        return (
            <div className={s.postsBlock}>
                <h3>my posts</h3>
                <div>
                    <NewPostForm addPost={addPost}/>
                </div>
                <div className={s.posts}>
                    {posts.map(
                        post => <Post key={post.id} id={post.id} message={post.message} like_cnt={post.like_cnt}/>
                    )}
                </div>
            </div>
        )
    }
}

export default MyPosts
