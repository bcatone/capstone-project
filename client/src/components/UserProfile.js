import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from 'react-redux';
import { updateErrors } from "../redux/error/errorSlice";
import UserProfileInfoCard from "./UserProfileInfoCard";
import AboutMe from "./AboutMe";

function UserProfile() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
      fetch(`/users/${id}`)
      .then(resp => {
        if (resp.ok) {
          console.log(user);
          resp.json().then(user => setUser(user));
        } else {
          resp.json().then(json => dispatch(updateErrors([json.errors])))
        }
      })
    }, [dispatch, id, user])

    if (!user) {
      return (
        <div>
          Loading...
        </div>
        
      )
    }

    return (
        <div className="row">
            {/* <div className="col">
            <UserProfileInfoCard user={user}/>
            </div> */}
            <div className="col">
                <AboutMe />
            </div>
            
        </div>
    );
};

export default UserProfile;