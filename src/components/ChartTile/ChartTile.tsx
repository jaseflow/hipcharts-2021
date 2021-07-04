import React from 'react';

import { Link } from 'react-router-dom';

interface ChartTileProps {
  id: string;
  title: string;
  subTitle: string;
  imageUrl: string;
  link?: string;
  small?: boolean;
  cosigns?: number;
}

function ChartTile(
  {
    id,
    title,
    subTitle,
    imageUrl,
    link,
    small,
    cosigns,
  }: ChartTileProps) {

  return (
    <Link to={link ? link : `/chart?c=${id}`} className={`ChartTile ${small ? 'ChartTile--small' : ''}`}>
      <div className="ChartTile__cover" style={{ backgroundImage: `url(${imageUrl})`}}></div>
      <footer className="ChartTile__footer">
        <h4 className="ChartTile__title">{title}</h4>
        <h5 className="ChartTile__subtitle">{subTitle}</h5>
      </footer>
    </Link>
  );
}

export default ChartTile;
