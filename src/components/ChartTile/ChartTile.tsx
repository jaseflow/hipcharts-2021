import React from 'react';

import { Link } from 'react-router-dom';

interface ChartTileProps {
  id: string;
  title: string;
  subTitle: string;
  imageUrl: string;
  link?: string;
  small?: boolean;
}

function ChartTile(
  {
    id,
    title,
    subTitle,
    imageUrl,
    link,
    small,
  }: ChartTileProps) {

  return (
    <Link to={link ? link : `/chart?c=${id}`} className={`ChartTile ${small ? 'ChartTile--small' : ''}`} style={{ backgroundImage: `url(${imageUrl})`}}>
      <footer className="ChartTile__footer">
        <h3 className="ChartTile__title">
          {title} 
          <small className="ChartTile__subtitle">{subTitle}</small>
        </h3>
      </footer>
    </Link>
  );
}

export default ChartTile;
