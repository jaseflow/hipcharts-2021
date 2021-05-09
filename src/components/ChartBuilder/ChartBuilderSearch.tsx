import React, { useState, useEffect, useRef } from 'react';

import ChartBuilderResult from './ChartBuilderResult';

interface ChartBuilderSearchProps {
  chartType: string;
  disabled: boolean;
  results?: any[];
  resultsIndex?: number;
  searching?: boolean;
  focus?: boolean;
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
    disabled,
    onSearchStart,
    onSearchStop,
    onSearchEnter,
    onSearchResults,
    onSearchNavigate,
    onSearchClick,
    results,
    resultsIndex,
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
    let realChartType = '';
    const query = chartType && chartType.slice(0, -1);

    if (chartType === 'rappers') {
      realChartType = 'artists'
    } else {
      realChartType = chartType
    }

    if (value === '') {
      onSearchStop();
    }

    if (value) {
      onSearchStart();
      fetch(`http://localhost:4040/search/${realChartType}?${query}=${value}`)
        .then(response => response.json())
        .then((data) => {
          onSearchResults(data)
        })
    }

    if (searchInput && focus) {
      searchInput?.current?.focus();
    }

  }, [value, focus]) // eslint-disable-line react-hooks/exhaustive-deps

  const resultsWithImages = results && results.length > 0 && results.filter((r) => {
    if (r.images.length) {
      return true
    } else {
      return false
    }
  })

  const resultsList = resultsWithImages && resultsWithImages.map((r, i) => {
    const lastImage = r.images && r.images[r.images.length - 1]

    return (
      <ChartBuilderResult
        key={`result-${r.name}`}
        selected={i === resultsIndex}
        imageUrl={lastImage.url}
        result={r.name}
        id={r.id}
        onSelected={() => handleSearchClick(i)}
      />
    )
  })

  return (
    <div className={`ChartBuilderSearch ${disabled ? 'ChartBuilderSearch--disabled' : ''}`}>
      <input
        autoFocus
        value={value}
        disabled={disabled}
        data-testid="search"
        placeholder={`Search for ${chartType}`}
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
