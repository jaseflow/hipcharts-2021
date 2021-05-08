import React, { useState, useEffect } from 'react';

import { useParams } from "react-router-dom";

import ChartItem from '../ChartItem/ChartItem';

function Chart() {

  const [chartType, setChartType] = useState('')
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  let { chart } = useParams<{ chart: string }>();

  useEffect(() => {
    fetch(`http://localhost:4040/chart/${chart}`)
      .then(response => response.json())
      .then((data) => {
        const chart = data.data[0];
        const ids = chart.items;
        setChartType(chart.type);
        fetch(`http://localhost:4040/${chart.type}?ids=${ids}`)
          .then(response => response.json())
          .then((data) => {
            setItems(data);
            setLoading(false);
          })
      })
  },[])

  const itemsList = items.length && items.map((item: any) => {
    return (
      <ChartItem key={item.id} name={item.name} imageUrl={item.images[0].url} />
    )
  })

  if (loading) {
    return (
      <div className="ChartSpinner">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  }

  return (
    <section className="flex flex--guts escape-header Chart">
      <div className="container flex flex--column flex--guts Chart__body">
        {chartType === 'albums'
          ? <h1 className="ChartBuilder__title title title--large" data-testid="title">Top 5 Albums Of All Time</h1>
          : <h1 className="ChartBuilder__title title title--large" data-testid="title">Top 5 Rappers Of All Time</h1>
        }
        <div className="ChartItems">
          {itemsList}
        </div>
      </div>
    </section>
  );
}

export default Chart;
