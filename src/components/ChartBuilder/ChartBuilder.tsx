import React, { useState } from 'react';

import ChartBuilderItem from './ChartBuilderItem';
import ChartBuilderSearch from './ChartBuilderSearch';

import { useParams } from "react-router-dom";

const emptyItems = [{},{},{},{},{}];

function ChartBuilder() {

  let { chart } = useParams<{ chart: string }>();

  const [items, setItems] = useState(emptyItems)

  const itemsList = items.map((item, i) => {
    return <ChartBuilderItem key={`chart-item-${i}`} order={i + 1} />
  })

  return (
    <section className="ChartBuilder escape-header flex flex--guts">
      <div className="container container--small">
        <h1 className="ChartBuilder__title title">
          {
            {
            'albums': 'Top 5 Albums Of All Time',
            'tracks': 'Top 5 Tracks Of All Time',
            'artists': 'Top 5 Artists Of All Time',
            }[chart]
          }
        </h1>
        <div className="ChartBuilder__search">
          <ChartBuilderSearch chartType={chart} />
        </div>
        <ol className="ChartBuilder__items">
          {itemsList}
        </ol>
        <footer className="ChartBuilder__footer">
          <button className="btn">Publish</button>
          <button
            className="btn btn--secondary"
            onClick={() => setItems(emptyItems)}>
            Reset
          </button>
        </footer>
      </div>
    </section>
  );
}

export default ChartBuilder;
