import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateErrors } from "../redux/error/errorSlice";
import { updateMe } from "../redux/me/meSlice";
import { useNavigate } from "react-router";
import { updateCountries } from "../redux/countries/countriesSlice";
import { Country, State, City, csc } from 'country-state-city';

function Signup() {
  const [formOptions, setFormOptions] = useState({
    countries: [],
    states: [],
    cities: [],
  });
  const [avatarDisplayUrl, setAvatarDisplayUrl] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone_number: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    date_of_birth: "",
    country_id: "",
    state_id: "",
    city_id: "",
    zip_code: "",
    avatar: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.error.value);

  useEffect(() => {
    fetch("/countries").then((resp) => {
      if (resp.ok) {
        resp.json().then((countries) => {
          dispatch(updateCountries);
          setFormOptions({ ...formOptions, countries: countries });
        });
      } else {
        resp.json().then((errors) => console.log(errors));
      }
    });
  }, []);

  const handleCountrySelection = (e) => {
    const country_id = e.target.value;
    fetch(`/countries/${country_id}`).then((resp) => {
      if (resp.ok) {
        resp.json().then((states) => {
          setFormOptions({ ...formOptions, states: states.states });
          setFormData({ ...formData, country_id: country_id });
        });
      } else {
        resp.json().then((json) => console.log(json));
      }
    });
  };

  const handleStateSelection = (e) => {
    const state_id = e.target.value;
    fetch(`states/${state_id}`).then((resp) => {
      if (resp.ok) {
        resp.json().then((cities) => {
          setFormOptions({ ...formOptions, cities: cities.cities });
          setFormData({ ...formData, state_id: state_id });
        });
      } else {
        resp.json().then((json) => console.log(json));
      }
    });
  };

  const getMinDateOfBirth = () => {
    let currentDate = new Date();
    let year = currentDate.getFullYear() - 13;
    let month = currentDate.getMonth() + 1;
    month = month.toString().padStart(2, "0");
    let day = currentDate.getDate();
    day = day.toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "country_id" || name === "state_id" || name === "city_id") {
      value = parseInt(value);
    }

    if (name === "avatar") {
      value = e.target.files[0];
      setAvatarDisplayUrl(URL.createObjectURL(value));
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    if (formData.avatar) {
      data.append("avatar", formData.avatar);
    }

    data.append("username", formData.username);
    data.append("password", formData.password);
    data.append("email", formData.email);
    data.append("phone_number", formData.phone_number);
    data.append("first_name", formData.first_name);
    data.append("middle_name", formData.middle_name);
    data.append("last_name", formData.last_name);
    data.append("date_of_birth", formData.date_of_birth);
    data.append("country_id", formData.country_id);
    data.append("state_id", formData.state_id);
    data.append("city_id", formData.city_id);
    data.append("zip_code", formData.zip_code);

    fetch(`/users`, {
      method: "POST",
      body: data,
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => {
          fetch('/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: formData.username, password: formData.password})
          })
          .then(resp=> {
            if (resp.ok) {
              resp.json().then(user => dispatch(updateMe(user)));
              navigate('/');
            } else {
              resp.json().then(json => console.log([json.errors]));
            }
          })
        });
      } else {
        resp.json().then((json) => {
          console.log(json);
          dispatch(updateErrors([json.errors]));
        });
      }
    });
  };

  // Styles
  const loginClass = "form-signin w-100 m-auto"
  const fieldClass = "h3 mb-3 fw-normal";
  const buttonClass = "w-20 btn btn-lg btn-primary";

  return (
    <div className={loginClass}>
      <h1>Sign Up</h1>
      <form
        encType="multipart/form-data"
        acceptCharset="UTF-8"
        onSubmit={handleSubmit}
      >

        <div>
          <input
            className={fieldClass}
            type="text"
            name="username"
            value={formData.userName}
            placeholder="*Enter username"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            className={fieldClass}
            type="password"
            name="password"
            value={formData.password}
            placeholder="*Enter password"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            className={fieldClass}
            type="email"
            name="email"
            value={formData.userName}
            placeholder="Enter email"
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            className={fieldClass}
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            placeholder="Enter phone number"
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            className={fieldClass}
            type="text"
            name="first_name"
            value={formData.first_name}
            placeholder="*Enter first name"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            className={fieldClass}
            type="text"
            name="last_name"
            value={formData.last_name}
            placeholder="*Enter last name"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            className={fieldClass}
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            max={getMinDateOfBirth()}
            onChange={handleChange}
          />
        </div>

        <div>
          <select defaultValue={""}
            className={fieldClass}
            onChange={handleCountrySelection}
            name="country_id"
            value={formData.country_id}
          >
            <option value="" disabled>Select a country:</option>
            {formOptions.countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {formData.country ? (
          <div>
          <select defaultValue={""}
            className={fieldClass}
            onChange={handleStateSelection}
            name="state_id"
          >
            <option value="" disabled>Select a state:</option>
            {formOptions.states.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        ) : null}

        {formData.state_id ? (
          <div>
          <select className={fieldClass} onChange={handleChange} name="city_id" defaultValue={""}>
          <option value="" disabled>Select a city:</option>
            {formOptions.cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        ) : null}

        <div>
          <input
            className={fieldClass}
            type="text"
            name="zip_code"
            value={formData.zip_code}
            placeholder="Enter zip code"
            onChange={handleChange}
          />
        </div>

        <div>
          <img className="avatar-preview" src={avatarDisplayUrl} />
          <div className="form-group">
            <label className={fieldClass}>Upload a profile picture: </label>
            <input
              className={fieldClass}
              type="file"
              multiple={false}
              name="avatar"
              onChange={handleChange}
            />
          </div>

        </div>
        {errors.map((error) => (
          <p>{error}</p>
        ))}
        <div>
          <input className={buttonClass} type="submit" value="Sign up" />
        </div>
      </form>
    </div>
  );
}

export default Signup;
