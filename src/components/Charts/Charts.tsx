import React, { useState, useEffect } from 'react';

import ChartTile from '../ChartTile/ChartTile';
import IntroCta from '../Intro/IntroCta';

function Charts() {

  const [charts, setCharts] = useState([])

  const chartsList = charts && charts.map((chart: any) => {
    return (
      <ChartTile
        key={`chart-${chart.id}`}
        id={chart.id}
        title={`${chart.author}'s`}
        subTitle={`Top 5 ${chart.type}`}
        imageUrl={chart.montage}
        small={true}
      />
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
        {!charts.length ?
          (
            <div class="Empty flex flex--guts">
              <div className="text-centered flex flex--column flex--guts">
                <h1 className="Empty__title">No charts</h1>
                <h2 className="Empty__subtitle">Why not be the first to make one?</h2>
                <IntroCta small={true} />
              </div>
            </div>
          )
          :
          <div className="container">
            <div className="Charts__list">
              {chartsList}
            </div>
          </div>
        }
      </div>
    </section>
  );
}

export default Charts;
