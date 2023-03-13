import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector, useDispatch } from "react-redux";
import { updateErrors } from "../redux/error/errorSlice";
import { updateProjects } from "../redux/projects/projectsSlice";

function AddProjectForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "Testing",
    image: "",
    url: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const errors = useSelector((state) => state.error.value);
  const projects = useSelector((state) => state.projects.value);
  const dispatch = useDispatch();

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

    fetch("/projects", {
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
          console.log(errors);
        });
      }
    });
  };

  return (
    <div>
      <form
        encType="multipart/form-data"
        acceptCharset="UTF-8"
        onSubmit={handleSubmit}
      >
        <div>
          <input
            type="text"
            name="title"
            value={formData.title}
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
        <div>
          <input
            type="file"
            multiple={false}
            name="image"
            onChange={handleChange}
          />
        </div>
        <div>
            <input type="url" name="url" value={formData.url} />
        </div>
        <input type="submit" value="Share Project" />
      </form>
      {errors.map((error) => (
        <p>{error}</p>
      ))}
    </div>
  );
}

export default AddProjectForm;
