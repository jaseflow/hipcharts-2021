import React from 'react';

interface ChartBuilderItemProps {
  id?: string;
  name?: string;
  chartType?: string;
  imageUrl?: string;
  order: number;
}

function ChartBuilderItem({
  id,
  name,
  chartType,
  imageUrl,
  order,
}: ChartBuilderItemProps) {
  return (
    <li className="ChartBuilderItem">
      <strong className="ChartBuilderItem__order">{ order }</strong>
      {name && name.length > 0
        ? <span>{ name }</span>
        : <span className="ChartBuilderItem__empty">Choose {chartType}</span>
      }
    </li>
  );
}

export default ChartBuilderItem;
