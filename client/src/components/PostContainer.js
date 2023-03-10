import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateErrors } from "../redux/error/errorSlice";
import { updatePosts } from "../redux/posts/postsSlice";
import CreatePostForm from "./CreatePostForm";
import PostPreview from "./PostPreview";

function PostContainer() {
    const posts = useSelector((state) => state.posts.value);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`/posts`).then((resp) => {
          if (resp.ok) {
            resp.json().then((postsArr) => {
                dispatch(updatePosts(postsArr))});
          } else {
            resp.json().then((json) => dispatch(updateErrors([json.errors])));
          }
        });
      }, []);

      if (!posts) {
        return <p>There are no posts to view.</p>
      }

    return (
        <div>
            <CreatePostForm />
            {posts.map(post => <PostPreview key={post.id} post={post} />)}
        </div>
    )
};

export default PostContainer;

