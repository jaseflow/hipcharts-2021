import React, { useState } from 'react';

interface TypeaheadItemProps {
  id: string;
  imageUrl: string;
  result: string;
  selected: boolean;
  subText?: string;
  onSelected?: any;
}

function TypeaheadItem({ id, imageUrl, result, selected, subText, onSelected }: TypeaheadItemProps) {

  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <div
      onClick={onSelected}
      key={`result-${id}`}
      className={`Ta__Item ${selected ? 'Ta__Item--selected' : ''}`}>
      <img 
        src={imageUrl}
        alt={result}
        className={`Ta__ItemImg ${imgLoaded ? 'Ta__ItemImg--loaded': ''}`}
        onLoad={() => setImgLoaded(true)}
      />
      <div>
        <p className="flat">{result}</p>
        <span className="ghosty">{subText}</span>
      </div>
    </div>
  )
}

export default TypeaheadItem;
