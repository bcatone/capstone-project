import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector, useDispatch } from "react-redux";
import { updateDirectMessages } from "../redux/direct_message_lists/directMessageListsSlice";
import { updateErrors } from "../redux/error/errorSlice";

function CreatePostForm() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const messages = useSelector((state) => state.direct_message_lists.value)
  const me = useSelector((state) => state.me.value)
  const dispatch = useDispatch();

  const onChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleContentChange = (value) => {
    setFormData({...formData, content: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
        title: formData.title, 
        content: formData.content,
        user_id: me.id
    }

    fetch("/posts", {
        
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(resp => {
        if (resp.ok) {
            resp.json().then(post => dispatch(updatePosts([post, ...posts])))
        } else {
            resp.json().then(json => dispatch(updateErrors([json.errors])))
        }
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={onChange}
          placeholder="Enter a title"
          required
        />
        {/* <textarea cols={80} rows={10} name="content">{formData.content}</textarea> */}
        <ReactQuill name="content" value={formData.content} onChange={handleContentChange}>

        </ReactQuill>
        
        <input type="submit" value="Post" />
      </form>
    </div>
  );
}

export default CreatePostForm;
