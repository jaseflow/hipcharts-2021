import React, { useState, useEffect } from 'react';

import ChartTile from '../ChartTile/ChartTile';
import IntroCta from '../Intro/IntroCta';

import Spinner from '../Spinner/Spinner';

import utils from '../../utils';

function Charts() {

  const [charts, setCharts] = useState([])
  const [loading, setLoading] = useState(true);

  const chartsList = charts && charts.map((chart: any) => {
    return (
      <ChartTile
        key={`chart-${chart.id}`}
        id={chart.id}
        title={`${chart.author}'s`}
        subTitle={`Top 5 ${utils.capitalize(chart.type)} Of All Time`}
        imageUrl={chart.montage}
        small={true}
        cosigns={5}
      />
    )
  })

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/charts/all`)
      .then(response => response.json())
      .then((data) => {
        setCharts(data.data)
        setLoading(false);
      })
  },[])

  if (loading) {
    return <Spinner />
  } else {
    return (
      <section className="escape-header">
        <div className="page-container">
          <div className="container">
            <h1 className="title title--large">Browse Charts</h1>
          </div>
          <div className="Charts">
            {!charts.length ?
              (
                <div className="Empty flex flex--guts">
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
        </div>
      </section>
    );
  }
}

export default Charts;
