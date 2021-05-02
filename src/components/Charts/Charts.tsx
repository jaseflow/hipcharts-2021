import React from 'react';

import ChartTile from '../ChartTile/ChartTile';

interface ChartsProps {
  charts: any[]
}

function Charts({ charts }: ChartsProps) {

  const chartsList = charts.map((chart) => {
    return (
      <ChartTile
        key={`chart-${chart.id}`}
        id={chart.id}
        title={chart.title}
        subTitle={chart.subTitle}
        imageUrl={chart.imageUrl}
      />
    )
  })

  return (
    <section className="flex flex--guts escape-header">
      <div className="container flex flex--column flex--guts">
        <h1 className="Charts__title title title--large">Choose a chart</h1>
        <div className="Charts__list">
          {chartsList}
        </div>
      </div>
    </section>
  );
}

export default Charts;
