import React from 'react'

export default function EpisodesList(props) {
  const { episodes, toggleFavAction, favorites } = props;

  return <div className="episode-layout">
    {episodes.map(episode => {
      return (
        <section key={episode.id} className='episode-box'>
          <img
            // src="https://via.placeholder.com/300x200"
            src={(episode.image) ? episode.image.medium : "https://via.placeholder.com/250x140"}
            alt={`Rick and Morty ${episode.name}`}
          />
          <div>{episode.name}</div>
          <section style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              Season: {episode.season} Number: {episode.number}
            </div>
            <button type='button' onClick={() => toggleFavAction(episode)}>
              {favorites.find(fav => fav.id === episode.id) ? 'Unfav' : 'Fav'}
            </button>
          </section>
        </section>
      )
    })}
  </div>
}