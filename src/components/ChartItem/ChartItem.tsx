import React, { useState, useEffect } from 'react';

interface ChartItemProps {
  name: string;
  imageUrl: string;
  artist?: string;
}

function ChartItem({ name, imageUrl, artist } : ChartItemProps) {

  return (
    <div className="ChartItem">
      <div className="ChartItem__bg" style={{ backgroundImage: `url(${imageUrl})`}}></div>
      <footer className="ChartItem__footer">
        <h3 className="ChartItem__name">{name}</h3>
      </footer>
    </div>
  );
}

export default ChartItem;
