import React from 'react';
import { Store } from './Store';

const EpisodesList = React.lazy(() => import('./EpisodesList'));

export default function FavPage() {
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

  const props = {
    episodes: state.favorites,
    toggleFavAction: toggleFavAction,
    favorites: state.favorites
  };

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <div className='episode-layout'>
        <EpisodesList {...props} />
      </div>
    </React.Suspense>
  );
}