import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateMe } from '../redux/me/meSlice';
import { updateErrors } from '../redux/error/errorSlice';

function UpdateAvatar() {
    const me = useSelector((state) => state.me.value);
    const [avatarDisplay, setAvatarDisplay] = useState();
    const [formData, setFormData] = useState({
        avatar: ""
    });
    const dispatch = useDispatch();

    // useContext(() => {
    //     setAvatarDisplay(me.avatar.url)
    // }, [formData])

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.files[0];
        console.log(value);
        setAvatarDisplay(value);
        setFormData({...formData, [name]: value});
        setAvatarDisplay(URL.createObjectURL(value));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append("avatar", formData.avatar);
        console.log(me.id)

        fetch(`/users/${me.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: data
        })
        .then(resp => {
            if (resp.ok) {
                resp.json().then(user => dispatch(updateMe(user)));
            } else {
                resp.json().then(json => dispatch(updateErrors([json.errors])));
            }
        })
    }

    return (
        <div>
            <div className="account-option-title">Update Avatar</div>
            <img className="avatar-preview" src={avatarDisplay} />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <input
                  type="file"
                  name="avatar"
                  onChange={handleChange}
                />
                </div>
                <input type="submit" value="Change Avatar" />
            </form>
        </div>
    );
};

export default UpdateAvatar;