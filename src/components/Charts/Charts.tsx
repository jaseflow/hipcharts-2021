import React from 'react';

import Chart from '../Chart/Chart';

function Charts({ charts }) {

  const chartsList = charts.map((chart) => {
    return (
      <Chart
        id={chart.id}
        title={chart.title}
        subTitle={chart.subTitle}
        imageUrl={chart.imageUrl}
      />
    )
  })

  return (
    <section className="flex flex--guts escape-header Charts">
      <div className="container flex flex--column flex--guts">
        <h1 className="Charts__title title title--large">Choose a chart</h1>
        <div class="Charts__list">
          {chartsList}
        </div>
      </div>
    </section>
  );
}

export default Charts;
