import React, { useState, useEffect } from 'react';

interface ChartBuilderSearchProps {
  chartType: string;
  disabled: boolean;
  results?: any[];
  resultsIndex?: number;
  searching?: boolean;
  onSearchStart: any;
  onSearchNavigate: any;
  onSearchStop: any;
  onSearchEnter: any;
  onSearchResults: any;
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
    results,
    resultsIndex,
    searching,
  } : ChartBuilderSearchProps) {

  const [ value, setValue ] = useState('');

  function handleKeyDown(e: any) {
    if (e.keyCode === 40) {
      onSearchNavigate('down')
    }
    if (e.keyCode === 38) {
      onSearchNavigate('up')
    }
    if (e.keyCode === 13) {
      onSearchEnter(e)
      setValue('');
    }
  }

  useEffect(() => {
    const query = chartType && chartType.slice(0, -1);

    if (value === '') {
      onSearchStop();
    }

    if (value) {
      onSearchStart();
      fetch(`http://localhost:4040/search/${chartType}?${query}=${value}`)
        .then(response => response.json())
        .then((data) => {
          onSearchResults(data)
        })
    }
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

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
      <div
        key={`result-${r.id}`}
        className={`ResultsItem ${i === resultsIndex ? 'ResultsItem--selected' : ''}`}>
        <img src={lastImage.url} alt={r.name} className="ResultsItem__img"/>
        {r.name}
      </div>
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
        className="ChartBuilderSearch__input"
        onChange={(e) => setValue(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
        onBlur={onSearchStop}
        type="input" />
      <i className="fas fa-search ChartBuilderSearch__icon" />
      <div className={`Results ${searching ? 'Results--searching' : ''}`}>
        {resultsList}
      </div>
    </div>
  );
}

export default ChartBuilderSearch;
