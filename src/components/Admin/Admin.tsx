import React, { useState, useEffect } from 'react';

import Typeahead from '../Typeahead/Typeahead';

function Admin() {

  const [type, setType] = useState('track')
  const [artist, setArtist] = useState('')
  const [period, setPeriod] = useState('all-time')

  const [query, setQuery] = useState(`?type=${type}&period=${period}`)
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    const includeByArtist = artist.length && type !== 'artists';
    const artistCapitalized = artist.charAt(0).toUpperCase() + artist.slice(1)

    setQuery(`?type=${type}${artist ? '&artist=' + artist : ''}${period ? '&period=' + period : ''}`)
    setTitle(`Top 5 ${includeByArtist ? artistCapitalized : ''} ${type}s  of ${period}`)
    console.log('query changed', query)
  }, [type, artist, period, query])

  function handleAddSuggestion(id: string) {
    let ids : string[] = [...suggestions];
    ids.push(id)

    setSuggestions(ids);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    const data = {
      "name": title,
      "query": query,
      "suggestions": suggestions.map((d: any) => d.id).join('|'),
    }
    fetch(`${process.env.REACT_APP_API_URL}/charts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => console.log(data))
  }

  return (
    <section className="escape-header Admin">
      <div className="page-container">
        <div className="container">
          <h1 className="title title--large">Create a chart</h1>
          <div className="Admin__container flex flex--column flex--around">
            <div className="flex__full flex flex--bottom Admin__form">
              <div className="flex__full">
                <h1 className="title">Configure the chart</h1>
                <form action="" onSubmit={handleSubmit}>
                  <div className="flex flex--bottom flex--gap m-b-4">
                    <div className="flex__full">
                      <label htmlFor="chartType" className="ghosty">Top 5</label>
                      <select name="chartType" defaultValue="track" className="input" onChange={(e) => setType(e.target.value)}>
                        <option value="track">Tracks</option>
                        <option value="album">Albums</option>
                        <option value="artist">Artists</option>
                      </select>
                    </div>
                    <div className={`flex__fuller flex flex--aligned flex--gap ${type === 'artist' ? 'ghost' : ''}`}>
                      <div className="flex__full Admin__search">
                        <label htmlFor="chartArtist" className="ghosty">By</label>
                        <Typeahead
                          noSubText={true}
                          query="?type=artist"
                          disabled={type === 'artist'}
                          placeholder="All artists"
                          onSearchClick={(val:any) => setArtist(val.name)}
                          onSearchEnter={(val:any) => setArtist(val.name)} />
                      </div>
                    </div>
                    <div className={`flex__full ${(type === 'album' || type === 'track') && artist.length ? 'ghost' : ''}`}>
                      <label htmlFor="chartYear" className="ghosty">Of</label>
                      <select name="chartYear" value={period} className="input" onChange={(e) => setPeriod(e.target.value)}>
                        <option value="all-time">All Time</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                        <option value="2016">2016</option>
                        <option value="2015">2015</option>
                        <option value="2014">2014</option>
                        <option value="2013">2013</option>
                        <option value="2012">2012</option>
                        <option value="2011">2011</option>
                        <option value="2010">2010</option>
                      </select>
                    </div>
                  </div>
                  <div className="Admin__footer flex flex--aligned flex--spaced">
                    <div>
                      <label className="ghosty">Chart name</label>
                      <h2 className="title title--light flat">{title}</h2>
                    </div>
                    <button className="btn Admin__action">
                      Create chart
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <Typeahead
              query={query}
              placeholder="Search suggestions"
              onSearchClick={(val:any) => handleAddSuggestion(val.id)}
              onSearchEnter={(val:any) => handleAddSuggestion(val.id)} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Admin;
