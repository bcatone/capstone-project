import React from "react";

function ProjectCard({project}) {
    return (
        <div>
            {project.title}
            <img src={project.image}/>
            <p>{project.description}</p>
        </div>
    );
};

export default ProjectCard;