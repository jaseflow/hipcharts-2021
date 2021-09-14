import React, { useState, useEffect, useRef } from 'react';

import TypeaheadItem from '../Typeahead/TypeaheadItem';

interface ChartBuilderSearchProps {
  chartType: string;
  disabled: boolean;
  results?: any[];
  query?: string;
  resultsIndex?: number;
  selectedIds: any[];
  searching?: boolean;
  focus?: boolean;
  artist?: string;
  onSearchStart: any;
  onSearchNavigate: any;
  onSearchStop: any;
  onSearchEnter: any;
  onSearchResults: any;
  onSearchClick: any;
}

function ChartBuilderSearch(
  {
    chartType,
    artist,
    disabled,
    onSearchStart,
    onSearchStop,
    onSearchEnter,
    onSearchResults,
    onSearchNavigate,
    onSearchClick,
    selectedIds,
    results,
    resultsIndex,
    query,
    searching,
    focus,
  } : ChartBuilderSearchProps) {

  const [ value, setValue ] = useState('');

  const searchInput = useRef<HTMLInputElement>(null);

  function closeSearch() {
    onSearchStop();
    setValue('');
  }

  function handleSearchClick(i: number) {
    onSearchClick(i);
    setValue('');
  }

  function handleKeyDown(e: any) {
    if (e.keyCode === 27) {
      closeSearch();
    }
    if (e.keyCode === 40) {
      onSearchNavigate('down')
    }
    if (e.keyCode === 38) {
      onSearchNavigate('up')
    }
    if (e.keyCode === 13) {
      e.preventDefault();
      onSearchEnter();
      closeSearch();
    }
  }

  useEffect(() => {
    if (value === '') {
      onSearchStop();
    }

    if (value.length > 0) {
      onSearchStart();
      fetch(`${process.env.REACT_APP_API_URL}/search${query}&q=${value}`)
        .then(response => response.json())
        .then((data) => {
          const filteredResults = data && data.length > 0 && data.filter((r : any) => {
            const selected = selectedIds.includes(r.id)
            console.log(r);
            if (r.type === 'track') {
              console.log('1');
              if (r?.album?.images?.length && !selected) {
                console.log('2');
                return true
              } else {
                return false
              }
            } else {
              if (r?.images?.length && !selected) {
                return true
              } else {
                return false
              }
            }
          })
          onSearchResults(filteredResults)
        })
    }

    if (searchInput && focus) {
      searchInput?.current?.focus();
    }

  }, [value, focus]) // eslint-disable-line react-hooks/exhaustive-deps

  const resultsList = results && results.map((r, i) => {
    let lastImage;

    if (r.images) {
      console.log('1');
      if (r.type === 'track') {
        console.log('2');
        lastImage = r.album?.images[r.images.length - 1];
      } else {
        console.log('3');
        lastImage = r.images[r.images.length - 1];
      }
    }

    return (
      <TypeaheadItem
        key={`result-${r.name}`}
        selected={i === resultsIndex}
        imageUrl={lastImage?.url}
        result={r.name}
        id={r.id}
        onSelected={() => handleSearchClick(i)}
      />
    )
  })

  const placeholder = artist ? `Search for ${artist} ${chartType}s` : `Search for ${chartType}s`;

  return (
    <div className={`ChartBuilderSearch ${disabled ? 'ChartBuilderSearch--disabled' : ''}`}>
      <input
        autoFocus
        value={value}
        disabled={disabled}
        data-testid="search"
        placeholder={placeholder}
        className="input"
        onChange={(e) => setValue(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
        ref={searchInput}
        type="input" />
      <i className="fas fa-search ChartBuilderSearch__icon" />
      <div className={`Results ${searching ? 'Results--searching' : ''}`}>
        <h4 className="Results__heading">Searching for <strong>{value}</strong></h4>
        {resultsList}
      </div>
    </div>
  );
}

export default ChartBuilderSearch;
