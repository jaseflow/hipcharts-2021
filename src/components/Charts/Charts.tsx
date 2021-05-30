import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import ChartTile from '../ChartTile/ChartTile';

function Charts() {

  const [albumCharts, setAlbumCharts] = useState([])
  const [artistCharts, setArtistCharts] = useState([])

  const albumsList = albumCharts && albumCharts.map((chart: any) => {
    return (
      <Link className="Charts__tile" to={`/chart/${chart.id}`}>
        <h4>{chart.author}</h4>
      </Link>
    )
  })

  const artistsList = artistCharts && artistCharts.map((chart: any) => {
    return (
      <Link className="Charts__tile" to={`/chart/${chart.id}`}>
        <h4>{chart.author}</h4>
      </Link>
    )
  })

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/charts/all`)
      .then(response => response.json())
      .then((data) => {
        setArtistCharts(data.data.artists)
        setAlbumCharts(data.data.albums)
      })
  },[])

  return (
    <section className="escape-header">
      <div className="Charts">
        <div className="container">
          <div className="Charts__container">
            <div>
              <h2>Top 5 Albums Of All Time</h2>
              <div className="Charts__list">
                {albumsList}
              </div>
            </div>
            <div>
              <h2>Top 5 Artists Of All Time</h2>
              <div className="Charts__list">
                {artistsList}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Charts;
