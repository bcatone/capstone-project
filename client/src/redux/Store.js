import { configureStore } from '@reduxjs/toolkit'
import meReducer from "./me/meSlice";
import friendSuggestionsReducer from "./friend_suggestions/friendSuggestionsSlice";
import friendsReducer from "./friends/friendsSlice";
import friendRequestsReducer from "./friend_requests/friendRequestsSlice";
import errorReducer from "./error/errorSlice";
import loadingReducer from "./loading/loadingSlice";
import projectsReducer from "./projects/projectsSlice"
import postsReducer from "./posts/postsSlice"
import directMessageListsReducer from './direct_message_lists/directMessageListsSlice';
import directMessagesReducer from "./direct_messages/directMessagesSlice";
import countriesReducer from "./countries/countriesSlice";
import statesReducer from "./states/statesSlice";
import citiesReducer from "./cities/citiesSlice";

export const store = configureStore({
    reducer: {
        me: meReducer,
        direct_message_lists: directMessageListsReducer,
        direct_message: directMessagesReducer,
        error: errorReducer,
        loading: loadingReducer,
        friend_suggestions: friendSuggestionsReducer,
        friends: friendsReducer,
        friend_requests: friendRequestsReducer,
        projects: projectsReducer,
        posts: postsReducer
    }
});