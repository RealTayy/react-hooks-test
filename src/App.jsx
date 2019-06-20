import React from 'react';
import { Link } from "react-router-dom";
import { Store } from './Store';

export default function App(props) {
  // Subscribe to the the closest parent component which uses `React.createContext`
  const { state, dispatch } = React.useContext(Store);
  // The above line is the same as:
  // const store = React.useContext(Store)
  // const state = store.state
  // const dispatch = store.dispatch

  return (
    <React.Fragment>
      {/* {console.log(state)} */}
      <header className='header'>
        <div>
          <h1>Rick and Morty</h1>
          <p>Pick your favorite episodes</p>
        </div>
        <div>
          <Link to='/'>Home</Link>{' '}
          <Link to='/faves'>Favorite(s) {state.favorites.length}</Link>
        </div>
      </header>
      {props.children}
    </React.Fragment>
  );
}