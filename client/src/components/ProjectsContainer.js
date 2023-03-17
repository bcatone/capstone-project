import React, { useEffect } from "react";
import { updateErrors } from "../redux/error/errorSlice";
import { updateProjects } from "../redux/projects/projectsSlice";
import { useSelector, useDispatch } from "react-redux";
import ProjectCard from "./ProjectCard";
import AddProjectForm from "./AddProjectForm";

function ProjectsContainer() {
  const projects = useSelector((state) => state.projects.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateErrors([]))
  }, []);

  useEffect(() => {
    fetch("/projects").then((resp) => {
      if (resp.ok) {
        resp.json().then((projects) => dispatch(updateProjects(projects)));
      } else {
        resp
          .json()
          .then(dispatch((json) => dispatch(updateErrors([json.errors]))));
      }
    });
  }, [dispatch]);

  return (
    <div className="connection-container text-dark">
      <div className="fs-3">Projects</div>
      <div className="contents">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <hr />
      <div className="fs-3">Add a Project</div>
      <AddProjectForm />
    </div>
  );
}

export default ProjectsContainer;
