import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProjects } from "../redux/projects/projectsSlice";

function ProjectCard({ project }) {
  const dispatch = useDispatch();
  const parse = require("html-react-parser");
  const projects = useSelector((state) => state.projects.value);

  const handleDelete = () => {
    const filteredProjects = projects.filter(p => p != project);

    fetch(`projects/${project.id}`, {
      method: "DELETE"
    })
    .then(resp => dispatch(updateProjects(filteredProjects)))
  }

  return (
    <div className="project-card">
      <div className="fs-4">{project.title}</div>
      <div>
        <img className="avatar-preview" src={project.image.url} alt="project" />
      </div>
      <div>{parse(`<div>${project.description}</div>`)}</div>
      <div className="btn btn-danger" onClick={handleDelete}>Delete</div>
    </div>
  );
}

export default ProjectCard;
