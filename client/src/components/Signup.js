import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateErrors } from "../redux/error/errorSlice";
import { updateMe } from "../redux/me/meSlice";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { updateCountries } from "../redux/countries/countriesSlice";

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
    career_title: "",
    avatar: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.error.value);

  useEffect(() => {
    dispatch(updateErrors([]))
  }, []);

  useEffect(() => {
    fetch("/geolocations").then((resp) => {
      if (resp.ok) {
        resp.json().then((geoData) => {
          setFormOptions({
            countries: geoData.all_countries,
            states: geoData.all_states_in_country,
            cities: geoData.all_cities_in_state,
          });
          setFormData({
            ...formData,
            country_id: geoData.country_id,
            state_id: geoData.state_id,
            city_id: geoData.city_id,
            zip_code: geoData.geolocation.zip,
          });
        });
      } else {
        getCountries();
      }
    });
  }, []);

  const getCountries = () => {
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
  };

  const handleCountrySelection = (country_id) => {
    setFormData({
      ...formData,
      country_id: country_id,
      state_id: "",
      city_id: "",
      zip_code: "",
    });
    fetch(`/countries/${country_id}`).then((resp) => {
      if (resp.ok) {
        resp.json().then((states) => {
          setFormOptions({ ...formOptions, states: states.states });
        });
      } else {
        resp.json().then((json) => console.log(json));
      }
    });
  };

  const handleStateSelection = (state_id) => {
    setFormData({ ...formData, state_id: state_id, city_id: "", zip_code: "" });
    fetch(`states/${state_id}`).then((resp) => {
      if (resp.ok) {
        resp.json().then((cities) => {
          setFormOptions({ ...formOptions, cities: cities.cities });
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
    data.append("career_title", formData.career_title);

    fetch(`/users`, {
      method: "POST",
      body: data,
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => {
          fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: formData.username,
              password: formData.password,
            }),
          }).then((resp) => {
            if (resp.ok) {
              resp.json().then((user) => dispatch(updateMe(user)));
              navigate("/");
            } else {
              resp.json().then((json) => console.log([json.errors]));
            }
          });
        });
      } else {
        resp.json().then((json) => {
          console.log(json);
          dispatch(updateErrors([json.errors]));
        });
      }
    });
  };

  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      {errors.length > 0 ? (
        <div className="row alert alert-danger">
          {errors.map((error, i) => (
            <p key={i}>{error}</p>
          ))}
        </div>
      ) : null}

      <div className="row">
        <h1>Sign Up</h1>
      </div>

      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-3">
          <input
            className="form-control"
            type="text"
            name="username"
            value={formData.userName}
            placeholder="*Enter username"
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            className="form-control"
            type="password"
            name="password"
            value={formData.password}
            placeholder="*Enter password"
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3">
          <input
            className="form-control"
            type="email"
            name="email"
            value={formData.userName}
            placeholder="Enter email"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3">
          <input
            className="form-control"
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            placeholder="Enter phone number"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3">
          <input
            className="form-control"
            type="text"
            name="first_name"
            value={formData.first_name}
            placeholder="*Enter first name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3">
          <input
            className="form-control"
            type="text"
            name="last_name"
            value={formData.last_name}
            placeholder="*Enter last name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3">
          <input
            className="form-control"
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            max={getMinDateOfBirth()}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-3">
          <input
            className="form-control"
            type="text"
            name="career_title"
            value={formData.career_title}
            placeholder="Enter job title"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3">
          <select
            defaultValue={""}
            className="form-select"
            onChange={(e) => handleCountrySelection(e.target.value)}
            name="country_id"
            value={formData.country_id}
          >
            <option value="" disabled>
              Select a country:
            </option>
            {formOptions.countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {formData.country_id ? (
          <div className="col-md-3">
            <select
              defaultValue={""}
              className="form-select"
              onChange={(e) => handleStateSelection(e.target.value)}
              name="state_id"
              value={formData.state_id}
            >
              <option value="" disabled>
                Select a state:
              </option>
              {formOptions.states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        {formData.state_id ? (
          <div className="col-md-3">
            <select
              className="form-select"
              onChange={handleChange}
              name="city_id"
              value={formData.city_id}
              defaultValue={""}
            >
              <option value="" disabled>
                Select a city:
              </option>
              {formOptions.cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div className="col-md-3">
          <input
            className="form-control"
            type="text"
            name="zip_code"
            value={formData.zip_code}
            placeholder="Enter zip code"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <img className="avatar-preview" src={avatarDisplayUrl} />
        </div>

        <div className="col-md-8">
          <label className="form-label">Upload a profile picture: </label>
          <input
            className="form-control"
            type="file"
            multiple={false}
            name="avatar"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-12">
          <input
            className="btn btn-primary btn-lg"
            type="submit"
            value="Sign up"
          />
        </div>
      </form>

      {/* <form
        encType="multipart/form-data"
        acceptCharset="UTF-8"
        onSubmit={handleSubmit}
      >
        <div className="row">
          <div className="col-md-4">
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

          <div className="col-md-4">
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
        </div>

        <div className="row">
        <div className="col-md-4">
          <input
            className={fieldClass}
            type="email"
            name="email"
            value={formData.userName}
            placeholder="Enter email"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <input
            className={fieldClass}
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            placeholder="Enter phone number"
            onChange={handleChange}
          />
        </div>
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
            required
          />
        </div>

        <div>
          <select
            defaultValue={""}
            className={fieldClass}
            onChange={(e) => handleCountrySelection(e.target.value)}
            name="country_id"
            value={formData.country_id}
          >
            <option value="" disabled>
              Select a country:
            </option>
            {formOptions.countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {formData.country_id ? (
          <div>
            <select
              defaultValue={""}
              className={fieldClass}
              onChange={(e) => handleStateSelection(e.target.value)}
              name="state_id"
              value={formData.state_id}
            >
              <option value="" disabled>
                Select a state:
              </option>
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
            <select
              className={fieldClass}
              onChange={handleChange}
              name="city_id"
              value={formData.city_id}
              defaultValue={""}
            >
              <option value="" disabled>
                Select a city:
              </option>
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
        <div>
          <input className={buttonClass} type="submit" value="Sign up" />
        </div>
      </form> */}
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
}

export default Signup;
