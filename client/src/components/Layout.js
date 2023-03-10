import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { updateMe } from "../redux/me/meSlice";
import { updateFriends } from "../redux/friends/friendsSlice";
import { updateFriendSuggestions } from "../redux/friend_suggestions/friendSuggestionsSlice";
import { updateErrors } from "../redux/error/errorSlice";
import { updateLoading } from "../redux/loading/loadingSlice";
import NavBar from "./NavBar";
import MeCard from "./MeCard";
import InboxContainer from "./InboxContainer";

function Layout() {
  return (
    <div className="container-fluid">
      <div className="row">
        <NavBar />
      </div>
      <div className="row">
        <div className="col-sm-3">
          <MeCard />
          <InboxContainer />
        </div>
        <div className="col-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;