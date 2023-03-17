import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector, useDispatch } from "react-redux";
import { updateErrors } from "../redux/error/errorSlice";
import { updateProjects } from "../redux/projects/projectsSlice";

function AddProjectForm() {
  const me = useSelector((state) => state.me.value);
  const errors = useSelector((state) => state.error.value);
  const projects = useSelector((state) => state.projects.value);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    contributors: [me]
  });
  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "image") {
      value = e.target.files[0];
      setImageUrl(URL.createObjectURL(value));
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleContentChange = (value) => {
    setFormData({ ...formData, description: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("url", formData.url);

    if (formData.image !== "") {
      data.append("image", formData.image);
    }

    fetch(`users/${me.id}/projects`, {
      method: "POST",
      body: data,
    }).then((resp) => {
      if (resp.ok) {
        resp
          .json()
          .then((project) => dispatch(updateProjects([project, ...projects])));
      } else {
        resp.json().then((json) => {
          dispatch(updateErrors([json.errors]));
        });
      }
    });
  };

  return (
    <div>
      
      {errors.length > 0 ? (
        <div className="row alert alert-danger">
          {errors.map((error, i) => (
            <p key={i}>{error}</p>
          ))}
        </div>
      ) : null}

      <form
        encType="multipart/form-data"
        acceptCharset="UTF-8"
        onSubmit={handleSubmit}
      >
        <div>
          <input
            className="form-control"
            type="text"
            name="title"
            value={formData.title}
            placeholder="Enter title here"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            className="form-control"
            type="file"
            multiple={false}
            name="image"
            onChange={handleChange}
          />
        </div>

        <div>
          <ReactQuill
            name="description"
            value={formData.description}
            onChange={handleContentChange}
          />
        </div>
        <input className="btn btn-primary" type="submit" value="Share Project" />
      </form>
    </div>
  );
}

export default AddProjectForm;
