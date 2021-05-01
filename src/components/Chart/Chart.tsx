import React from 'react';

import { Link } from 'react-router-dom';

function Chart(
  {
    id,
    title,
    imageUrl,
    subTitle
  }) {

  return (
    <Link to={`/charts/${id}`} className="Chart" style={{ backgroundImage: `url(${imageUrl})`}}>
      <footer className="Chart__footer">
        <h3 className="Chart__title">
          {title} 
          <small className="Chart__subtitle">{ subTitle }</small>
        </h3>
      </footer>
    </Link>
  );
}

export default Chart;
