import React, { useState, useMemo } from 'react';

import ChartBuilderItem from './ChartBuilderItem';
import ChartBuilderSearch from './ChartBuilderSearch';

import update from 'immutability-helper';

import { useParams, Link } from "react-router-dom";

const arrayMove = require('array-move');

const emptyItems = [{},{},{},{},{}];

interface Chart {
  name?: string;
  id?: string;
  images?: any[];
  artists?: any[];
}

interface ChartBuilderProps {
  refresh?: boolean;
}

function ChartBuilder({ refresh } :ChartBuilderProps) {

  let { chart } = useParams<{ chart: string }>();

  const [items, setItems] = useState(emptyItems)
  const [insertIndex, setInsertIndex] = useState(0)
  const [results, setResults ] = useState([])
  const [resultsIndex, setResultsIndex] = useState(0)
  const [searching, setSearching ] = useState(false)

  const chartFull = useMemo(() => {
    const firstAvailable = items.findIndex((item:any) => !item.name)
    setInsertIndex(firstAvailable)
    return items.every((item:any) => item['name'])
  },[items]);

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
        onMoveUp={handleMoveUp}
        onMoveDown={handleMoveDown}
        onRemove={handleRemove}
      />
    )
  })

  function handleRemove(i: number) {
    const newItems = update(items, { $splice: [[i, 1, {}]] });
    setInsertIndex(0);
    setItems(newItems);
  }

  function handleMoveDown(i: number) {
		const newOrder = arrayMove(items, i, i + 1)
    const newItems = update(items, { $set: newOrder })
    setItems(newItems);
  }

  function handleMoveUp(i: number) {
		const newOrder = arrayMove(items, i, i - 1)
    const newItems = update(items, { $set: newOrder })
    setItems(newItems);
  }

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
    setResultsIndex(0);
		setResults([]);
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
        <div className={`ChartBuilder__wrap ${refresh ? 'ChartBuilder__wrap--refresh' : ''}`}>
          {chart === 'albums'
            ? <h1 className="ChartBuilder__title title" data-testid="title">Top 5 Albums Of All Time</h1>
            : <h1 className="ChartBuilder__title title" data-testid="title">Top 5 Rappers Of All Time</h1>
          }
          <div className="ChartBuilder__search">
            <ChartBuilderSearch
              searching={searching}
              disabled={chartFull}
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
          <div className={`ChartBuilder__form ${chartFull ? 'ChartBuilder__form--done' : ''}`}>
            <ol className="ChartBuilder__items">
              {itemsList}
            </ol>
            <footer className="ChartBuilder__footer">
              <button disabled={!chartFull} className="btn">Publish</button>
              <button
                className="btn btn--secondary"
                onClick={reset}>
                Reset
              </button>
            </footer>
          </div>
        </div>
        {chart === 'albums' &&
          <Link to="/charts/artists" className="ChartBuilder__link ChartBuilder__link--back">
            <i className="fa fa-chevron-left" style={{marginRight: '1rem'}}></i>
            Create a Top 5 Rappers Chart
          </Link>
        }
        {chart === 'artists' &&
          <Link to="/charts/albums" className="ChartBuilder__link ChartBuilder__link--forward">
            Create a Top 5 Albums Chart
            <i className="fa fa-chevron-right" style={{marginLeft: '1rem'}}></i>
          </Link>
        }
      </div>
    </section>
  );
}

export default ChartBuilder;
