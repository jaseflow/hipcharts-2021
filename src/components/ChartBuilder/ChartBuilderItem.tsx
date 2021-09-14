import React, { useState } from 'react';

interface ChartBuilderItemProps {
  id?: string;
  name?: string;
  chartType?: string;
  imageUrl?: string;
  order: number;
  artist?: string;
  onMoveUp?: any;
  onMoveDown?: any;
  onRemove?: any;
  onEmptyClick?: any;
}

function ChartBuilderItem({
  id,
  name,
  chartType,
  imageUrl,
  order,
  artist,
  onMoveUp,
  onMoveDown,
  onRemove,
  onEmptyClick,
}: ChartBuilderItemProps) {
	const index = order - 1;

  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <li className="ChartBuilderItem">
      <strong className="ChartBuilderItem__order">{ order }</strong>
      {name && name.length > 0
        ? (
          <div className="flex flex--aligned flex--spaced flex__full ChartBuilderItem__content">
            <div className="flex flex--aligned">
              <img 
                src={imageUrl}
                alt={name}
                className={`ChartBuilderItem__img ${imgLoaded ? 'ChartBuilderItem__img--loaded': ''}`}
                onLoad={() => setImgLoaded(true)}
              />
              <div>
                <span className="ChartBuilderItem__name">{ name }</span>
                {chartType === 'albums' ? <small className="ChartBuilderItem__artist">{artist}</small> : null}
              </div>
            </div>
            <div className="flex flex--aligned">
              <i
                onClick={() => order === 1 ? null : onMoveUp(index)}
                className={`fa fa-chevron-up ChartBuilderItem__action ${order === 1 ? 'ghosted': ''}`}
              />
              <i
                onClick={() => order === 5 ? null : onMoveDown(index)}
                className={`fa fa-chevron-down ChartBuilderItem__action ${order === 5 ? 'ghosted': ''}`}
              />
              <i
                onClick={() => onRemove(index)}
                className="fa fa-times ChartBuilderItem__action"
              />
            </div>
          </div>
        )
        : <span className="ChartBuilderItem__empty" onClick={onEmptyClick}>Choose {chartType}</span>
      }
    </li>
  );
}

export default ChartBuilderItem;
