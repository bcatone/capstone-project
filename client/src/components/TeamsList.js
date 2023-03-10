import React from "react";
import TeamListItem from "./TeamListItem";

function TeamsList() {
    
    const renderedTeamListItems = teams.map((team) => (
        <TeamListItem
          key={team.id}
          team={team}
        />
      ))

    return (
        <div>
            {renderedTeamListItems}
        </div>
    )
}