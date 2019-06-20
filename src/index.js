import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from './App';
import { StoreProvider } from './Store';
import './index.css';
import HomePage from './HomePage';
import FavPage from './FavPage';

ReactDOM.render(
  <StoreProvider>
    <BrowserRouter forceRefresh={!('pushState' in window.history)}>
      <App>
        <Switch>
          <Route
            exact path="/"
            render={(props) => {
              return <HomePage />
            }}
          />
          <Route
            exact path="/faves"
            render={(props) => {
              return <FavPage />
            }}
          />
        </Switch>
      </App>
    </BrowserRouter>
  </StoreProvider>,
  document.getElementById('root')
);
