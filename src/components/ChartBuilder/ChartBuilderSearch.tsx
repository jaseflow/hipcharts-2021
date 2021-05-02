import React from 'react';

interface ChartBuilderSearchProps {
  chartType: string;
}

function ChartBuilderSearch({ chartType } : ChartBuilderSearchProps) {

  function handleKeyDown(e: any) {
    console.log(e);
  }

  return (
    <div className="ChartBuilderSearch">
      <input
        autoFocus
        data-testid="search"
        placeholder={`Search for ${chartType}`}
        className="ChartBuilderSearch__input"
        onKeyDown={handleKeyDown}
        type="input" />
    </div>
  );
}

export default ChartBuilderSearch;
