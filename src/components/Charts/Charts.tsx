import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

function Charts() {

  const [charts, setCharts] = useState([])

  const chartsList = charts && charts.map((chart: any) => {
    return (
      <Link className="Charts__tile" to={`/chart?c=${chart.id}`} key={`chart-${chart.id}`}>
        <h4>{chart.author}</h4>
        <img src={chart.montage} alt={`${chart.author}'s chart`}/>
      </Link>
    )
  })

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/charts/all`)
      .then(response => response.json())
      .then((data) => {
        setCharts(data.data)
      })
  },[])

  return (
    <section className="escape-header">
      <div className="Charts">
        <div className="container">
          <div className="Charts__list">
            {chartsList}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Charts;
