import React from 'react';

import spotify from '../../spotify.png';

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
        <div className="ChartItem__footer-content">
          <div className="flex flex--aligned">
            <img src={imageUrl} alt={artist} className="ChartItem__thumb"/>
            <i className="ChartItem__order">{order}</i>
            <div>
              <h3 className="ChartItem__name">{name}</h3>
              { artist && <p>{artist}</p>}
            </div>
          </div>
        </div>
      </footer>
      <div className="ChartItem__view">
        Listen on
        <img src={spotify} alt="Spotify" className="ChartItem__spotify" />
      </div>
    </a>
  );
}

export default ChartItem;
