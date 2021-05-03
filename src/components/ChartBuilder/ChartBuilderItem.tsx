import React from 'react';

interface ChartBuilderItemProps {
  id?: string;
  name?: string;
  chartType?: string;
  imageUrl?: string;
  order: number;
  artist?: string;
}

function ChartBuilderItem({
  id,
  name,
  chartType,
  imageUrl,
  order,
  artist,
}: ChartBuilderItemProps) {
  return (
    <li className="ChartBuilderItem">
      <strong className="ChartBuilderItem__order">{ order }</strong>
      {name && name.length > 0
        ? (
          <div className="flex flex--aligned flex--spaced flex__full">
            <div className="flex flex--aligned">
              <img src={imageUrl} className="ResultsItem__img"/>
              <div>
                <span className="ChartBuilderItem__name">{ name }</span>
                {chartType === 'albums' ? <small className="ChartBuilderItem__artist">{artist}</small> : null}
              </div>
            </div>
            <div class="flex flex--aligned">
              <i className={`fa fa-chevron-up ChartBuilderItem__action ${order === 1 ? 'ghosted': ''}`} />
              <i className="fa fa-chevron-down ChartBuilderItem__action" />
              <i className={`fa fa-times ChartBuilderItem__action ${order === 5 ? 'ghosted': ''}`} />
            </div>
          </div>
        )
        : <span className="ChartBuilderItem__empty">Choose {chartType}</span>
      }
    </li>
  );
}

export default ChartBuilderItem;
