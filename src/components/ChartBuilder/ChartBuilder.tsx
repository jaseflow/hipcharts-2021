import React, { useState } from 'react';

import ChartBuilderItem from './ChartBuilderItem';
import ChartBuilderSearch from './ChartBuilderSearch';

import { useParams } from "react-router-dom";

const emptyItems = [{},{},{},{},{}];

interface Chart {
  name?: string;
  id?: string;
  imageUrl?: string;
}

function ChartBuilder() {

  let { chart } = useParams<{ chart: string }>();

  const [items, setItems] = useState(emptyItems)
  const [insertIndex, setInsertIndex] = useState(0)
  const [results, setResults ] = useState([])
  const [resultsIndex, setResultsIndex] = useState(0)
  const [searching, setSearching ] = useState(false)

  const itemsList = items.map((item: Chart, i) => {
    return (
      <ChartBuilderItem
        name={item.name}
        key={`chart-item-${i}`}
        order={i + 1}
        chartType={chart}
      />
    )
  })

  function handleSearchNavigate(direction: string) {
    if (direction === 'up') {
      setResultsIndex(resultsIndex - 1);
    } else if (direction === 'down') {
      setResultsIndex(resultsIndex + 1);
    }
  }

  function handleSearchEnter(e: any) {
    let newChart : Chart = {}
    let newItems = emptyItems;
    newChart.name = e.target.value;
    newItems = items.map((item, i) => {
      if (i === insertIndex) {
        return newChart
      } else {
        return {}
      }
    })
    setItems(newItems);
  }

  function handleSearchStart() {
    setSearching(true);
  }

  function handleSearchStop() {
    setSearching(false);
  }

  function handleSearchResults(results: any) {
    setResults(results);
  }

  function reset() {
    setItems(emptyItems);
  }

  return (
    <section className="ChartBuilder escape-header flex flex--guts">
      <div className="container container--small">
        <div className="ChartBuilder__wrap">
          <h1 className="ChartBuilder__title title" data-testid="title">
            {
              {
              'albums': 'Top 5 Albums Of All Time',
              'tracks': 'Top 5 Tracks Of All Time',
              'artists': 'Top 5 Artists Of All Time',
              }[chart]
            }
          </h1>
          <div className="ChartBuilder__search">
            <ChartBuilderSearch
              searching={searching}
              results={results}
              resultsIndex={resultsIndex}
              chartType={chart}
              onSearchNavigate={handleSearchNavigate}
              onSearchStart={handleSearchStart}
              onSearchStop={handleSearchStop}
              onSearchEnter={handleSearchEnter}
              onSearchResults={handleSearchResults}
            />
          </div>
          <ol className="ChartBuilder__items">
            {itemsList}
          </ol>
          <footer className="ChartBuilder__footer">
            <button className="btn">Publish</button>
            <button
              className="btn btn--secondary"
              onClick={reset}>
              Reset
            </button>
          </footer>
        </div>
      </div>
    </section>
  );
}

export default ChartBuilder;
