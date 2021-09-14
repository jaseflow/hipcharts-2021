import React, { useState, useEffect } from 'react';

import Typeahead from '../Typeahead/Typeahead';

interface ChartQueryBuilderProps {
  onBuild?: any;
}

function ChartQueryBuilder({ onBuild }: ChartQueryBuilderProps) {

  const [type, setType] = useState('track')
  const [artist, setArtist] = useState('')
  const [query, setQuery] = useState(`?type=${type}`);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const includeByArtist = artist.length && type !== 'artist';
    const artistCapitalized = artist.charAt(0).toUpperCase() + artist.slice(1)

    setQuery(`?type=${type}${artist ? '&artist=' + artist : ''}`)
    setTitle(`Top 5 ${includeByArtist ? artistCapitalized : ''} ${type}s ${includeByArtist  ? '' : 'of All Time'}`)
    console.log('query changed', query)
  }, [type, artist, query])


  function handleSubmit(e: any) {
    const bodyData = {
      "name": title,
      "query": query,
      "suggestions": null,
      "artist": artist,
      "type": type,
    }

    e.preventDefault();
    onBuild(bodyData);
  }

  return (
    <form action="" onSubmit={handleSubmit} className={`ChartQueryBuilder ${type !== 'artist' ? 'show-artist' : ''}`}>
      <h1 className="title title--large text-centered">What kind of Chart?</h1>
      <div className="flex flex--column flex--gap m-b-1">
        <div className="flex flex__full btn-group">
          <label htmlFor="type-track">
            <input type="radio" id="type-track" checked={type === 'track'} onChange={(e) => setType(e.target.value)} value="track" name="types" />
            <span className="btn btn--tab">Top 5 tracks</span>
          </label>
          <label htmlFor="type-album">
            <input type="radio" id="type-album" checked={type === 'album'} onChange={(e) => setType(e.target.value)} value="album" name="types" />
            <span className="btn btn--tab">Top 5 albums</span>
          </label>
          <label htmlFor="type-artist">
            <input type="radio" id="type-artist" checked={type === 'artist'} onChange={(e) => setType(e.target.value)} value="artist" name="types" />
            <span className="btn btn--tab">Top 5 artists</span>
          </label>
        </div>
      </div>
      <div className="ChartQueryBuilder__footer">
        <div className="ChartQueryBuilder__artist">
          <label htmlFor="chartArtist">By Artist/Group</label>
          <Typeahead
            noSubText={true}
            query="?type=artist"
            disabled={type === 'artist'}
            placeholder="All artists"
            onSearchClick={(val:any) => setArtist(val.name)}
            onSearchEnter={(val:any) => setArtist(val.name)} />
        </div>
        <div className="ChartQueryBuilder__action">
          <div className="text-centered m-b-2">
            <h4 className="text-caps small ghosty">Your chart will be called</h4>
            <p>{title}</p>
          </div>
          <button className="btn btn--block btn--large">
            Create Chart
          </button>
        </div>
      </div>
    </form>
  )
}

export default ChartQueryBuilder;
