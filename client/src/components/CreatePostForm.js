import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector, useDispatch } from "react-redux";
import { updatePosts } from "../redux/posts/postsSlice";
import { updateErrors } from "../redux/error/errorSlice";

function CreatePostForm() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const posts = useSelector((state) => state.posts.value);
  const me = useSelector((state) => state.me.value);
  const errors = useSelector((state) => state.error.value);
  const dispatch = useDispatch();

  const onChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleContentChange = (value) => {
    setFormData({ ...formData, content: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title: formData.title,
      content: formData.content,
      user_id: me.id,
    };

    fetch("/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((post) => dispatch(updatePosts([post, ...posts])));
      } else {
        resp.json().then((json) => dispatch(updateErrors([json.errors])));
      }
    });
  };

  return (
    <div className="post-form">
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
          theme="snow"
          value={formData.content}
          onChange={handleContentChange}
        ></ReactQuill>

        <input className="btn btn-primary" type="submit" value="Post" />
      </form>
    </div>
  );
}

export default CreatePostForm;
