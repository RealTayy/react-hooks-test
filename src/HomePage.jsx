import React from 'react';
import { Store } from './Store';

const EpisodesList = React.lazy(() => import('./EpisodesList'));

export default function HomePage() {
  // Subscribe to the the closest parent component which uses `React.createContext`
  const { state, dispatch } = React.useContext(Store);
  // The above line is the same as:
  // const store = React.useContext(Store)
  // const state = store.state
  // const dispatch = store.dispatch

  // Action that handles onClick of fav/unfav button
  const toggleFavAction = episode => {
    // Check if favorites has episode in it already
    const episodeInFavorites = state.favorites.includes(episode);
    // If favorites already contains episode
    if (!episodeInFavorites) {
      // Add episode to favorites
      return dispatch({
        type: 'ADD_FAV',
        payload: episode
      });
    }
    // Else favorites does not contain clicked episode
    else {
      // Get array of favorites without the clicked episode
      const favoritesWithoutRemoved = state.favorites.filter((favorite) => favorite.id !== episode.id)
      // Set favorites to new favorites array without the removed episode
      return dispatch({
        type: 'REMOVE_FAV',
        payload: favoritesWithoutRemoved
      });
    }
  }

  // Action that makes API call for episode data
  const fetchDataAction = async () => {
    const data = await fetch(
      'https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes'
    );
    const dataJSON = await data.json();
    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON._embedded.episodes
    });
  };

  // Life cycle events/Effect hooks
  React.useEffect(() => {
    state.episodes.length === 0 && fetchDataAction();
  });

  return (
    <React.Fragment>
      <React.Suspense fallback={<div>Loading...</div>}>
        <EpisodesList
          episodes={state.episodes}
          toggleFavAction={toggleFavAction}
          favorites={state.favorites}
        />
      </React.Suspense>
    </React.Fragment>
  );
}