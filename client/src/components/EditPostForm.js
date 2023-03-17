import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector, useDispatch } from "react-redux";
import { updatePosts } from "../redux/posts/postsSlice";
import { updateErrors } from "../redux/error/errorSlice";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

function EditPostForm({ post, toggleIsEditMode }) {
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
  });
  const me = useSelector((state) => state.me.value);
  const errors = useSelector((state) => state.error.value);
  const posts = useSelector((state) => state.posts.value);
  //   const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContentChange = (value) => {
    setFormData({ ...formData, content: value });
  };

  const onCancelPostEdit = () => {
    setFormData({ title: post.title, content: post.content });
    toggleIsEditMode();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title: formData.title,
      content: formData.content,
    };

    fetch(`/posts/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((updatedPost) => {
          const updatedPosts = posts.map((p) => {
            if (p.id === post.id) return updatedPost;
            return p;
          });
          dispatch(updatePosts(updatedPosts));
          toggleIsEditMode();
        });
      } else {
        resp.json().then((json) => dispatch(updateErrors([json.errors])));
      }
    });
  };

  return (
    <div>
      {errors.length > 0 ? (
        <div className="alert alert-danger">
          {errors.map((error, i) => (
            <p key={i}>{error}</p>
          ))}
        </div>
      ) : null}

      <form onSubmit={handleSubmit}>
        <input
          className="h3 mb-3 fw-normal"
          type="text"
          name="title"
          value={formData.title}
          onChange={onChange}
          placeholder="Enter a title"
          required
        />
        <ReactQuill
          name="content"
          value={formData.content}
          onChange={handleContentChange}
        ></ReactQuill>

        <input className="btn btn-primary" type="submit" value="Submit" />
      </form>
      <button className="btn btn-primary" onClick={onCancelPostEdit}>Cancel</button>
    </div>
  );
}

export default EditPostForm;
