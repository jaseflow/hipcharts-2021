import React, { useState, useEffect } from 'react';

import ChartTile from '../ChartTile/ChartTile';
import IntroCta from '../Intro/IntroCta';

import Spinner from '../Spinner/Spinner';

import utils from '../../utils';

function UserCharts() {

  const [userUserCharts, setUserCharts] = useState([])
  const [loading, setLoading] = useState(true);

  const userUserChartsList = userUserCharts && userUserCharts.map((chart: any) => {
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
    fetch(`${process.env.REACT_APP_API_URL}/user-userUserCharts`)
      .then(response => response.json())
      .then((data) => {
        setUserCharts(data.data)
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
            <h1 className="title title--large">Browse UserCharts</h1>
          </div>
          <div className="UserCharts">
            {!userUserCharts.length ?
              (
                <div className="Empty flex flex--guts">
                  <div className="text-centered flex flex--column flex--guts">
                    <h1 className="Empty__title">No userUserCharts</h1>
                    <h2 className="Empty__subtitle">Why not be the first to make one?</h2>
                    <IntroCta small={true} text="Create  chart" to="/create" />
                  </div>
                </div>
              )
              :
              <div className="container">
                <div className="UserCharts__list">
                  {userUserChartsList}
                </div>
              </div>
            }
          </div>
        </div>
      </section>
    );
  }
}

export default UserCharts;
