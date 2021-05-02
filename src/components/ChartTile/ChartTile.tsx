import React from 'react';

import { Link } from 'react-router-dom';

interface ChartTileProps {
  id: string;
  title: string;
  subTitle: string;
  imageUrl: string;
}

function ChartTile(
  {
    id,
    title,
    subTitle,
    imageUrl,
  }: ChartTileProps) {

  return (
    <Link to={`/charts/${id}`} className="ChartTile" style={{ backgroundImage: `url(${imageUrl})`}}>
      <footer className="ChartTile__footer">
        <h3 className="ChartTile__title">
          {title} 
          <small className="ChartTile__subtitle">{ subTitle }</small>
        </h3>
      </footer>
    </Link>
  );
}

export default ChartTile;
