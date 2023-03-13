import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { updateMe } from '../redux/me/meSlice';
import { updateErrors } from "../redux/error/errorSlice";
import UserCard from "./UserCard";
import UserProfileInfoCard from "./UserProfileInfoCard";
import AboutMe from "./AboutMe";

function UserProfile() {
    const me = useSelector((state) => state.me.value);
    const errors = useSelector((state) => state.error.value);
    const dispatch = useDispatch();
    const { id } = useParams();
    console.log(id);
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
    }, [])

    if (!user) {
      return (
        <div>
          Loading...
        </div>
        
      )
    }

    return (
        <div>
          <div className="row">
          <UserProfileInfoCard user={user}/>
          </div>
            <div className="row">
                <AboutMe />
            </div>
            
        </div>
    );
};

export default UserProfile;