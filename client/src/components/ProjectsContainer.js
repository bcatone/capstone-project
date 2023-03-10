import React, { useEffect, useState } from "react";
import { updateErrors } from "../redux/error/errorSlice";
import { updateProjects } from "../redux/projects/projectsSlice";
import { useSelector, useDispatch } from "react-redux";
import ProjectCard from "./ProjectCard";
import AddProjectForm from "./AddProjectForm"

function ProjectsContainer() {
    const projects = useSelector((state) => state.projects.value)
    const dispatch = useDispatch();

    useEffect(() => {
        fetch("/projects")
        .then(resp => {
            if (resp.ok) {
                resp.json().then(projects => dispatch(updateProjects(projects)))
            } else {
                resp.json().then(dispatch(json => dispatch(updateErrors([json.errors]))))
            }
        })
    }, [])
    
    return (
        <div>
            Add a Project
            <AddProjectForm />
            Projects
            {projects.map(project => (<ProjectCard key={project.id} project={project}/>))}
        </div>
    )
}

export default ProjectsContainer;