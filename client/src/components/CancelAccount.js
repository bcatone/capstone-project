import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateErrors } from "../redux/error/errorSlice";
import { updateFriends } from "../redux/friends/friendsSlice";
import { updateFriendRequests } from "../redux/friend_requests/friendRequestsSlice";
import { updateFriendSuggestions } from "../redux/friend_suggestions/friendSuggestionsSlice";
import { json } from "react-router";
import { updateMe } from '../redux/me/meSlice';
import { useNavigate } from "react-router";

function CancelAccount() {
  const [formData, setFormData] = useState({password: ""})
  const me = useSelector((state) => state.me.value)
  const errors = useSelector((state) => state.error.value)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    const {name, value} = e.target

    setFormData({...formData, [name]: value})
  }

  const logout = () => {
    dispatch(updateMe({}));
    dispatch(updateFriends([]));
    dispatch(updateFriendSuggestions([]));
    dispatch(updateErrors([]));
    navigate("/");
  };

  const handleAccountCancellation = (e) => {
    e.preventDefault();

    fetch(`/users/${me.id}`, {
      method: "DELETE",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
    }).then((resp) => {
      if (resp.ok) {
        logout();
      } else {
        resp.json().then((json) => {
          dispatch(updateErrors(json.errors));
        });
      }
    });
  };

    return (
        <div>
            <h3>Cancel Account</h3>
            <form onSubmit={handleAccountCancellation}>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={onChange}
                  placeholder="Enter password"
                />
                <input
                  type="checkbox"
                  required
                />
                <label>I really wish to cancel my account. </label>
                <input type="submit" value="Cancel Account" />
            </form>
            {/* {errors.length > 0 ? errors.map(error => <p>{error}</p>) : null } */}
        </div>
    );
};

export default CancelAccount