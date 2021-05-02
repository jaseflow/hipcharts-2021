import React, { useState } from 'react';

import ChartBuilderItem from './ChartBuilderItem';
import ChartBuilderSearch from './ChartBuilderSearch';

const emptyItems = [{},{},{},{},{}];

function ChartBuilder() {

  const [items, setItems] = useState(emptyItems)
  const [insert, setInsert] = useState(0)

  const itemsList = items.map((item, i) => {
    return <ChartBuilderItem order={i + 1} />
  })

  return (
    <section className="ChartBuilder escape-header flex flex--guts">
      <div className="container container--small">
        <h1 className="ChartBuilder__title title">
          Top 5 Artists of all time
        </h1>
        <div className="ChartBuilderSearch">
          <input
            placeholder="Search for artists"
            className="ChartBuilderSearch__input"
            type="input" />
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
