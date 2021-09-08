import React, { useState, useEffect } from 'react';

import { useHistory } from "react-router-dom";

import Typeahead from '../Typeahead/Typeahead';
import Spinner from '../Spinner/Spinner';

interface ChartOptionsProps {
  charts: any[],
  onCreate: any;
}

function ChartOptions({ charts, onCreate }: ChartOptionsProps) {

  const history = useHistory();

  const [type, setType] = useState('track')
  const [artist, setArtist] = useState('')
  const [loading, setLoading] = useState(false);
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
    let chart;
    const data = {
      "name": title,
      "query": query,
      "suggestions": null,
    }

    e.preventDefault();
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/charts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then((data) => {
        chart = {
          artist,
          type,
          query,
          title,
        }
        onCreate(chart);
        setLoading(false);
        history.push(`/create/${data.insertId}`)
      })
  }

  return (
    <section className="flex flex--guts fullscreen ChartOptions">
      <div className="container container--small ChartOptions__body">
        <h1 className="title title--large text-centered">What kind of Chart?</h1>
        <div className="flex__full">
          <form action="" onSubmit={handleSubmit}>
            <div className="flex flex--column flex--gap m-b-2">
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
              <div className={`flex__fuller flex flex--aligned flex--gap ${type === 'artist' ? 'ghost' : ''}`}>
                <div className="flex__full">
                  <label htmlFor="chartArtist">By Artist/Group</label>
                  <Typeahead
                    noSubText={true}
                    query="?type=artist"
                    disabled={type === 'artist'}
                    placeholder="All artists"
                    onSearchClick={(val:any) => setArtist(val.name)}
                    onSearchEnter={(val:any) => setArtist(val.name)} />
                </div>
              </div>
            </div>
            <div className="text-centered m-b-2">
              <h4 className="text-caps small ghosty">Your chart will be called</h4>
              <p>{title}</p>
            </div>
            <button className="btn btn--block btn--large">
              {loading ? <Spinner /> : 'Create chart'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ChartOptions;
