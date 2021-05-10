import React from 'react';

interface ChartItemProps {
  name: string;
  imageUrl: string;
  artist?: string;
  link: string;
  order: number;
}

function ChartItem({ name, imageUrl, artist, link, order } : ChartItemProps) {

  return (
    <a href={link} className="ChartItem" target="_blank" rel="noreferrer">
      <div className="ChartItem__bg" style={{ backgroundImage: `url(${imageUrl})`}}></div>
      <footer className="ChartItem__footer">
        <div className="flex flex--aligned">
          <i className="ChartItem__order">{order}</i>
          <div>
            <h3 className="ChartItem__name">{name}</h3>
            { artist && <p>{artist}</p>}
          </div>
        </div>
      </footer>
    </a>
  );
}

export default ChartItem;
