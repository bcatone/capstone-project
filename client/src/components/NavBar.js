import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { updateMe } from "../redux/me/meSlice";
import { updateFriends } from "../redux/friends/friendsSlice";
import { updateFriendSuggestions } from "../redux/friend_suggestions/friendSuggestionsSlice";
import { updateErrors } from "../redux/error/errorSlice";
import { updateLoading } from "../redux/loading/loadingSlice";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const me = useSelector((state) => state.me.value);


  const logout = () => {
    dispatch(updateMe({}));
    dispatch(updateFriends([]));
    dispatch(updateFriendSuggestions([]));
    dispatch(updateErrors([]));
    navigate("/");
  };

  const handleLogout = () => {
    fetch("/logout", {
      method: "DELETE",
    }).then((resp) => {
      if (resp.ok) {
        logout();
      } else {
        resp.json().then((json) => {
          dispatch(updateErrors(json.errors));
          dispatch(updateLoading(false));
        });
      }
    });
  };

    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Capstone Project
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              {/* Home */}
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>

              {/* Me */}
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  to={`/user/${me.id}`}
                >
                  Me
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={`/user/${me.id}`}>
                      View Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`user/${me.id}/portfolio`}>
                      View Portfolio
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`/user/${me.id}/account_settings`}>
                      Account Settings
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={handleLogout}>
                      Sign Out
                    </a>
                  </li>
                </ul>
              </li>

              {/* Network */}
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  to={`/network`}
                >
                  Network
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={`/network/friends`}>
                      Friend Page
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`/network/people`}>
                      Find Connections
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Explore */}
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  to={`/user/${me.id}`}
                >
                  Explore
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={`/explore/projects`}>
                      View Projects
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`/explore/interest_profiler`}>
                      Take O*Net Interest Profiler Test
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`/explore/career_insights`}>
                      View Career Insights
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>

            

            

          </div>
        </div>
      </nav>
        </div>
    );
};

export default NavBar;