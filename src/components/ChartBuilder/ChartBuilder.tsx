import React, { useState, useMemo } from 'react';

import ChartBuilderItem from './ChartBuilderItem';
import ChartBuilderSearch from './ChartBuilderSearch';
import ChartBuilderModal from './ChartBuilderModal';

import update from 'immutability-helper';

import { useHistory, useParams, Link } from "react-router-dom";

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

  const history = useHistory();

  const [items, setItems] = useState(emptyItems)
  const [insertIndex, setInsertIndex] = useState(0)
  const [results, setResults ] = useState<any[]>([])
  const [selectedIds, setSelectedIds ] = useState<any[]>([])
  const [resultsIndex, setResultsIndex] = useState(0)
  const [searching, setSearching ] = useState(false)
  const [modalOpen, setModalOpen ] = useState(false)
  const [searchFocus, setSearchFocus ] = useState(false)

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
        onEmptyClick={() => setSearchFocus(true)}
      />
    )
  })

  function closeSearch() {
    setSearching(false);
    setResultsIndex(0);
		setResults([]);
    setSearchFocus(false);
  }

  function handleRemove(i: number) {
    const newItems = update(items, { $splice: [[i, 1, {}]] });
    const newIds = update(selectedIds, { $splice: [[i, 1, {}]] });

    setInsertIndex(0);
    setSelectedIds(newIds);
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

    // create array of selected item ids
    let ids : string[] = [...selectedIds];
    ids.push(results[resultsIndex].id)
    console.log(results);

    setSelectedIds(ids);
    setItems(newItems);
    setInsertIndex(insertIndex + 1);
    setResultsIndex(0);
  }

  function handleSearchClick(i: number) {
    console.log(i);
    const newItems = update(items, { $splice: [[insertIndex, 1, results[i]]] });
    setItems(newItems);
    setInsertIndex(insertIndex + 1);
    closeSearch();
  }

  function handleSearchStart() {
    setSearching(true);
  }

  function handleSearchStop() {
    setResultsIndex(0);
    closeSearch();
  }

  function handleSearchResults(results: any) {
    setResults(results);
  }

  function reset(e: any) {
    e.preventDefault();
    setItems(emptyItems);
  }

  function saveChart(author: string) {
    const data = {
      "type": chart,
      "items":  items.map((d: any) => d.id).join('|'),
      "author": author,
    }
    fetch(`${process.env.REACT_APP_API_URL}/charts/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => history.push(`/chart?c=${data.insertId}`))
  }

  function handlePublish(author: string) {
    setModalOpen(false);
    saveChart(author)
  }

  function handleSave(e: any) {
    e.preventDefault();
    setModalOpen(true);
  }

  return (
    <section className="ChartBuilder escape-header flex flex--guts">
      <div className="container container--small">
        <form onSubmit={handleSave} className={`ChartBuilder__wrap ${refresh ? 'ChartBuilder__wrap--refresh' : ''}`}>
          {chart === 'albums'
            ? <h1 className="ChartBuilder__title title" data-testid="title">Top 5 Albums Of All Time</h1>
            : <h1 className="ChartBuilder__title title" data-testid="title">Top 5 Rappers Of All Time</h1>
          }
          <div className="ChartBuilder__search">
            <ChartBuilderSearch
              selectedIds={selectedIds}
              searching={searching}
              disabled={chartFull}
              results={results}
              resultsIndex={resultsIndex}
              chartType={chart}
              focus={searchFocus}
              onSearchNavigate={handleSearchNavigate}
              onSearchStart={handleSearchStart}
              onSearchStop={handleSearchStop}
              onSearchEnter={handleSearchEnter}
              onSearchResults={handleSearchResults}
              onSearchClick={(i: number) => handleSearchClick(i)}
            />
          </div>
          <div className={`ChartBuilder__form ${chartFull ? 'ChartBuilder__form--done' : ''}`}>
            <ol className="ChartBuilder__items">
              {itemsList}
            </ol>
            <footer className="ChartBuilder__footer">
              <button type="submit" className="btn" disabled={!chartFull}>Save</button>
              <button
                className="btn btn--secondary"
                onClick={reset}>
                Reset
              </button>
            </footer>
          </div>
        </form>
        {chart === 'albums' &&
          <Link to="/create/artists" className="ChartBuilder__link ChartBuilder__link--back">
            <i className="fa fa-chevron-left" style={{marginRight: '1rem'}}></i>
            Create a Top 5 Rappers Chart
          </Link>
        }
        {chart === 'artists' &&
          <Link to="/create/albums" className="ChartBuilder__link ChartBuilder__link--forward">
            Create a Top 5 Albums Chart
            <i className="fa fa-chevron-right" style={{marginLeft: '1rem'}}></i>
          </Link>
        }
      </div>
      <ChartBuilderModal
        open={modalOpen} 
        onClose={() => setModalOpen(false)}
        onPublish={(author: string) => handlePublish(author)}
      />
    </section>
  );
}

export default ChartBuilder;
