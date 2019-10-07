import React from "react";

export const Store = React.createContext();

const initialState = {
  episodes: [],
  currentUser: "",
  favorites: [],
  users: [
    {
      firstName: "Tay",
      lastName: "Mai",
      username: "tay.mai@test.com",
      password: "asdf1234",
      favorites: []
    },
    {
      firstName: "Tay",
      lastName: "Mai",
      username: "tay.mai@test.com2",
      password: "asdf1234",
      favorites: []
    }
  ]
};

function reducer(state, action) {
  // Helper functions for reducer
  function getUserIndex(username) {
    return state.users.findIndex(user => user.username === username);
  }

  // reducer Actions
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, episodes: action.payload };
    case "ADD_FAV":
      // Add fav to state
      let stateUpdate = { ...state, favorites: [...state.favorites, action.payload] }

      // Add fav to fake user DB
      const userIndex = getUserIndex(state.currentUser);
      stateUpdate.users[userIndex].favorites.push(action.payload)

      return stateUpdate;

    case "REMOVE_FAV": {
      return { ...state, favorites: action.payload };
    }
    case "LOG_IN": {
      let stateUpdate = { ...state }
      // Set current User
      stateUpdate.currentUser = action.payload;

      // Set favorites
      const userIndex = getUserIndex(action.payload);
      stateUpdate.favorites = state.users[userIndex].favorites;

      return stateUpdate;
    }
    case "LOG_OUT": return {...state, currentUser: ''};
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  // The above line is the same as:
  // const arr = React.useReducer(reducer, initialState);
  // const state = arr[0]
  // const dispact = arr[1]
  const value = { state, dispatch };
  // The above line is the same as:
  // const value = {
  //   state: state,
  //   dispatch: dispatch
  // }

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}