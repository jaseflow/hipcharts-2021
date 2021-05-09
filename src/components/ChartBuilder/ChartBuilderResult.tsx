import React, { useState } from 'react';

interface ChartBuilderResultProps {
  id: string;
  imageUrl: string;
  result: string;
  selected: boolean;
  onSelected: any;
}

function ChartBuilderResult({ id, imageUrl, result, selected, onSelected }: ChartBuilderResultProps) {

  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <div
      onClick={onSelected}
      key={`result-${id}`}
      className={`ResultsItem ${selected ? 'ResultsItem--selected' : ''}`}>
      <img 
        src={imageUrl}
        alt={result}
        className={`ResultsItem__img ${imgLoaded ? 'ResultsItem__img--loaded': ''}`}
        onLoad={() => setImgLoaded(true)}
      />
      {result}
    </div>
  )
}

export default ChartBuilderResult;
