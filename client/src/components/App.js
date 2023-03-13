import '../App.css';
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateErrors } from '../redux/error/errorSlice';
import { updateMe } from '../redux/me/meSlice';
import { Routes, Route } from "react-router-dom";
import LandingPage from './LandingPage';
import Layout from './Layout';
import Home from './Home';
import DirectMessageList from './DirectMessageList';
import UserProfile from './UserProfile';
import Settings from './Settings';
import NetworkPage from './NetworkPage';
import FriendSuggestionsContainer from './FriendSuggestionsContainer';
import FriendRequestsContainer from './FriendRequestsContainer';
import FriendPage from './FriendPage';
import ProjectsContainer from './ProjectsContainer';
import Project from './Project';
import InterestProfilerForm from './InterestProfilerForm';
import CancelAccount from './CancelAccount';

function App() {
  const me = useSelector((state) => state.me.value);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/me')
    .then(resp => {
      if (resp.ok) {
        resp.json().then(user => {
          dispatch(updateMe(user))
          dispatch(updateErrors([]))
        });
      } else {
        resp.json().then(json => {
          console.log(json)
          dispatch(updateErrors([]))
        });
      }
    })
  }, [dispatch]);

  if (!me.username) {
    return (
    <LandingPage />)
  }

  return (
    <div className="App">
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path="/home" element={<Home />} />
            <Route path="/user/:user_id/messages/:id" element={<DirectMessageList />} />
            <Route path="user/:id/cancel_account" element={<CancelAccount />} />
            <Route path="/user/:id/account_settings" element={<Settings />} />
            <Route path="/user/:id" element={<UserProfile />} />
            <Route path="/network/people" element={<FriendSuggestionsContainer />} />
            <Route path="/network/friend_requests" element={<FriendRequestsContainer />} />
            <Route path="/network/friends" element={<FriendPage />} />
            <Route path="/network" element={<NetworkPage />} />
            <Route path="/projects/:id" element={<Project />} />
            <Route path="/explore/projects" element={<ProjectsContainer />} />
            <Route path="/explore/interest_profiler" element={<InterestProfilerForm />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;