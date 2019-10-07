import React from 'react';
import { Link } from "react-router-dom";
import { Store } from './Store';
import LogInPage from './LogInPage';

export default function App(props) {
  // Subscribe to the the closest parent component which uses `React.createContext`
  const { state, dispatch } = React.useContext(Store);
  // The above line is the same as:
  // const store = React.useContext(Store)
  // const state = store.state
  // const dispatch = store.dispatch

  const handleLogOut = (e) => {
    return dispatch({ type: "LOG_OUT" });
  }

  return (
    <React.Fragment>
      {(state.currentUser)
        ?
        <>
          <header className='header'>
            <div>
              <h1>South Park</h1>
              <p>Pick your favorite episodes</p>
            </div>
            <div>
              <span>{(state.currentUser) ? `Logged in as: ${state.currentUser}` : `Not logged in`}</span>{' '}
              <Link to='/'>Home</Link>{' '}
              <Link to='/faves'>Favorite(s) {state.favorites.length}</Link>{' '}
              <button onClick={handleLogOut}>Log out</button>
            </div>
          </header>
          {props.children}
        </>
        :
        <LogInPage />
      }
    </React.Fragment>
  );
}