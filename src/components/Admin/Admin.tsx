import React, { useState, useEffect } from 'react';

function Admin() {

  const [type, setType] = useState('tracks')
  const [artist, setArtist] = useState('')
  const [period, setPeriod] = useState('all-time')

  const [title, setTitle] = useState('')

  function handleSearch(e: any) {
    setArtist(e.target.value);
  }

  useEffect(() => {
    const includeByArtist = artist.length && type !== 'artists';
    const artistCapitalized = artist.charAt(0).toUpperCase() + artist.slice(1)

    if (artist) {
      fetch(`${process.env.REACT_APP_API_URL}/search/${realChartType}?${query}=${artist}`)
        .then(response => response.json())
        .then((data) => {
          console.log()
        })
    }

    setTitle(`Top 5 ${includeByArtist ? artistCapitalized : ''} ${type}  of ${period}`)
  }, [type, artist, period])
  
  return (
    <section className="escape-header Admin">
      <div className="page-container">
        <div className="container">
          <div className="Admin__container flex flex--column flex--around">
            <div className="flex__full flex flex--bottom">
              <div className="flex__full">
                <h1 className="title title--large title--light ghosty">Configure the chart</h1>
                <form action="" className="flex flex--aligned flex--gap">
                  <div className="flex__full">
                    <label htmlFor="chartType">Top 5</label>
                    <select name="chartType" value={type} className="input" onChange={(e) => setType(e.target.value)}>
                      <option value="tracks">Tracks</option>
                      <option value="albums">Albums</option>
                      <option value="artists">Artists</option>
                    </select>
                  </div>
                  <div className={`flex__full flex flex--aligned flex--gap ${type === 'artists' ? 'ghost' : ''}`}>
                    <div className="flex__full">
                      <label htmlFor="chartArtist">By</label>
                      <input
                        type="text"
                        name="chartArtist"
                        readOnly={type === 'artists'}
                        className="input"
                        placeholder="All artists"
                        value={artist}
                        onChange={handleSearch}
                      />
                    </div>
                  </div>
                  <div className="flex__full">
                    <label htmlFor="chartYear">Of</label>
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
                </form>
              </div>
            </div>
            <footer className="flex__full flex flex--bottom flex--centered">
              <div className="flex flex--column flex--guts Admin__footer">
                <p className="ghosty">Your chart will be called</p>
                <h2>{title}</h2>
                <button className="btn Admin__action">
                  Next: Provide Suggestions
                  <i className="fa fa-chevron-right m-l-1"></i>
                </button>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Admin;
