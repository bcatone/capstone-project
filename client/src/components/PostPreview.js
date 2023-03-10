import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePosts } from "../redux/posts/postsSlice";
import { updateErrors } from "../redux/error/errorSlice";
import EditPostForm from "./EditPostForm";

function PostPreview({ post }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const me = useSelector((state) => state.me.value);
  const posts = useSelector((state) => state.posts.value);
  const dispatch = useDispatch();
  const parse = require("html-react-parser");

  const toggleIsEditMode = () => {
    setIsEditMode((isEditMode) => !isEditMode);
  };

  const onDelete = () => {
    const filteredPosts = posts.filter((p) => {
      return p !== post;
    });

    fetch(`/posts/${post.id}`, { method: "DELETE" }).then((resp) => {
      if (resp.ok) {
        dispatch(updatePosts(filteredPosts));
      } else {
        resp.json().then((json) => dispatch(updateErrors([json.errors])));
      }
    });
  };

  if (isEditMode && post.username === me.username) {
    return (
      <EditPostForm post={post} toggleIsEditMode={toggleIsEditMode} /> 
    );
  }

  return (
    <div className="post">
      <p className="post-title">{post.title}</p>
      <span>{post.created_at}</span>
      <p>{post.username} </p>

      {post.username === me.username ? (
        <div>
          <button className="btn btn-primary" onClick={toggleIsEditMode}>Edit Post</button>
          <button className="btn btn-primary" onClick={onDelete} value={post.id}>
            Delete
          </button>
        </div>
      ) : null}

      {parse(`<div>${post.content}</div>`)}
    </div>
  );
}

export default PostPreview;
