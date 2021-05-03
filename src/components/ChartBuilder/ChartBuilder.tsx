import React, { useState } from 'react';

import ChartBuilderItem from './ChartBuilderItem';
import ChartBuilderSearch from './ChartBuilderSearch';

import update from 'immutability-helper';

import { useParams } from "react-router-dom";

const emptyItems = [{},{},{},{},{}];

interface Chart {
  name?: string;
  id?: string;
  images?: any[];
}

function ChartBuilder() {

  let { chart } = useParams<{ chart: string }>();

  const [items, setItems] = useState(emptyItems)
  const [insertIndex, setInsertIndex] = useState(0)
  const [results, setResults ] = useState([])
  const [resultsIndex, setResultsIndex] = useState(0)
  const [searching, setSearching ] = useState(false)

  const itemsList = items.map((item: Chart, i) => {

    const hasImage = item.images && item.images.length > 0
    const lastImage = item.images && item.images[item.images.length - 1].url

    const artist = item.artists  && item.artists[0].name;

    return (
      <ChartBuilderItem
        name={item.name}
        imageUrl={hasImage && lastImage}
        artist={artist}
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
    const newItems = update(items, { $splice: [[insertIndex, 1, results[resultsIndex]]] });
    setItems(newItems);
    setInsertIndex(insertIndex + 1);
    setResultsIndex(0);
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
            <button className="btn">Share</button>
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
