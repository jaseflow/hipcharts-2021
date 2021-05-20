import React from 'react';

import ChartTile from '../ChartTile/ChartTile';

interface ChartOptionsProps {
  charts: any[]
}

function ChartOptions({ charts }: ChartOptionsProps) {

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
    <section className="flex flex--guts escape-header ChartOptions">
      <div className="container flex flex--column flex--guts ChartOptions__body">
        <h1 className="ChartOptions__title title title--large">Choose a chart</h1>
        <div className="ChartOptions__list">
          {chartsList}
        </div>
      </div>
    </section>
  );
}

export default ChartOptions;
