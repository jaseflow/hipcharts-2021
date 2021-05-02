import React from 'react';

interface ChartBuilderItemProps {
  id?: string;
  name?: string;
  imageUrl?: string;
  order: number;
}

function ChartBuilderItem({
  id,
  name,
  imageUrl,
  order,
}: ChartBuilderItemProps) {
  return (
    <li className="ChartBuilderItem">
      <strong className="ChartBuilderItem__order">{ order }</strong>
      <span className="ChartBuilderItem__empty">Choose artist</span>
    </li>
  );
}

export default ChartBuilderItem;
