import React, { useState } from 'react';
import { Store } from './Store';

export default function LogInPage() {
  // Subscribe to the the closest parent component which uses `React.createContext`
  const { state, dispatch } = React.useContext(Store);
  // The above line is the same as:
  // const store = React.useContext(Store)
  // const state = store.state
  // const dispatch = store.dispatch

  /// Set up component state variables
  const
    [username, setUsername] = useState('tay.mai@test.com'),
    [password, setPassword] = useState('asdf1234');

  // Input change handlers
  const handleChange = (e, setter) => setter(e.target.value);

  // Log in handler
  const handleLogIn = () => {
    const userIndex = state.users.findIndex(user => user.username === username);
    // Check if user exist in fake DB
    if (userIndex !== -1) {
      // Check if password is correct. If correct then log in
      if (state.users[userIndex].password === password) return dispatch({ type: "LOG_IN", payload: username });
      else displayError("Password for user is incorrrect");
    }
    else displayError("User doesn't Exist");
  };

  // Create user handler
  const handleCreateUser = () => {

  }

  // Function to display error messages
  const displayError = (errorMessage) => {
    document.getElementById("log-in-header").textContent = errorMessage
    document.getElementById("log-in-header").style.color = "red";
  }

  return (
    <React.Fragment>
      <div className="log-in-layout">
        <h4 id="log-in-header">Log In Page</h4>
        <div className="form-group">
          <label> Username: </label>
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={(e) => handleChange(e, setUsername)} />
        </div>
        <div className="form-group">
          <label> Password: </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => handleChange(e, setPassword)} />
        </div>
        <button
          style={{ marginTop: '.5rem' }}
          onClick={handleLogIn}
        >Log in</button>
        <button
          style={{ marginTop: '.5rem' }}
          onClick={handleCreateUser}
        >Create User</button>
      </div>
    </React.Fragment>
  );
}