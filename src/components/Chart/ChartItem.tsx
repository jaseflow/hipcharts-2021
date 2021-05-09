import React from 'react';

interface ChartItemProps {
  name: string;
  imageUrl: string;
  artist?: string;
  link: string;
}

function ChartItem({ name, imageUrl, artist, link } : ChartItemProps) {

  return (
    <a href={link} className="ChartItem" target="_blank">
      <div className="ChartItem__bg" style={{ backgroundImage: `url(${imageUrl})`}}></div>
      <footer className="ChartItem__footer">
        <h3 className="ChartItem__name">{name}</h3>
        { artist && <p>{artist}</p>}
      </footer>
    </a>
  );
}

export default ChartItem;
