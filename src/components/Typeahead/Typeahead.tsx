import React, { useState, useEffect, useRef } from 'react';

import TypeaheadItem from './TypeaheadItem';

interface TypeaheadProps {
  onSearchStart?: any;
  onSearchNavigate?: any;
  onSearchStop?: any;
  onSearchEnter?: any;
  onSearchResults?: any;
  onSearchClick?: any;
  query: string;
  noSubText?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

function Typeahead(
  {
    onSearchStart,
    onSearchStop,
    onSearchEnter,
    onSearchResults,
    onSearchNavigate,
    onSearchClick,
    query,
    placeholder,
    noSubText,
    disabled,
  } : TypeaheadProps) {

  const [value, setValue ] = useState('');
  const [results, setResults] = useState<any[]>([])
  const [resultsIndex, setResultsIndex] = useState(0)
  const [searching, setSearching] = useState(false)

  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!value.length) {
      setSearching(false)
    } else { 
      console.log(query);
      fetch(`${process.env.REACT_APP_API_URL}/search${query}&q=${value}`)
        .then(response => response.json())
        .then((data) => {
          setResults(data);
        })
    }
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleSearchClick(result: any) {
    onSearchClick(result);
    closeSearch();
  }

  function handleSearchNavigate(direction: string) {
    if (direction === 'up') {
      setResultsIndex(resultsIndex - 1);
    } else if (direction === 'down') {
      setResultsIndex(resultsIndex + 1);
    }
  }

  function closeSearch() {
    setSearching(false);
    setResultsIndex(0);
  }

  function handleKeyDown(e: any) {
    setSearching(true);
    if (e.keyCode === 27) {
      setValue('');
      closeSearch()
    }
    if (e.keyCode === 40) {
      e.preventDefault();
      handleSearchNavigate('down')
    }
    if (e.keyCode === 38) {
      e.preventDefault();
      handleSearchNavigate('up')
    }
    if (e.keyCode === 13) {
      e.preventDefault();
      closeSearch();
      setValue(results[0]?.name);
      onSearchEnter(results[resultsIndex]);
    }
  }

  const resultsList = results && results.map((r, i) => {
    const lastImage = r.images && r.images[r.images.length - 1]

    return (
      <TypeaheadItem
        key={`result-${r.name}`}
        selected={i === resultsIndex}
        imageUrl={lastImage?.url}
        result={r.name}
        subText={!noSubText && r.artists[0]?.name}
        id={r.id}
        onSelected={() => handleSearchClick(r)}
      />
    )
  })

  return (
    <div className="Ta">
      <input
        autoFocus
        value={value}
        disabled={disabled}
        data-testid="search"
        placeholder={placeholder}
        className="input Typeahead__input"
        onChange={(e) => setValue(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
        ref={searchInput}
        type="input" />
      <i className="fas fa-search Ta__icon" />
      <div className={`Ta__results ${searching ? 'Ta__results--searching' : ''}`}>
        <h4 className="Ta__heading">Searching for <strong>{value}</strong></h4>
        {resultsList}
      </div>
    </div>
  )
}

export default Typeahead;
