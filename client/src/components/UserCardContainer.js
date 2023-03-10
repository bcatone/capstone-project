import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import UserCard from "./UserCard";

function UserCardContainer({ title, userArr }) {
    console.log(title)
            console.log(userArr)
    return (
        <div className="row">
            <p>{title}</p>
            {userArr.length > 0 ? userArr.map(user => <UserCard key={user.id} user={user} />) : null}
        </div>
    )
}

export default UserCardContainer;