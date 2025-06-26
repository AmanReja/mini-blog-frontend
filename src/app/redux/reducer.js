import { combineReducers } from "redux";
import { ADD_POST, DELETE_POST, UPDATE_POST, GETALL_POST } from "./action";

const initialState = {
  posts: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETALL_POST:
      return {
        ...state,
        posts: action.payload,
      };

    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };

    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? { ...post, ...action.payload } : post
        ),
      };

    default:
      return state;
  }
};

// Root reducer (corrected structure)
const rootReducer = combineReducers({
  posts: postReducer, // Now access posts as state.posts
});

export default rootReducer;
