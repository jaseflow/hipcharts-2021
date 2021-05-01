import React from 'react';

import { Link } from 'react-router-dom';

function Chart({ id, title, imageUrl }) {

  return (
    <Link to={`/${id}`} className="Chart" style={{ backgroundImage: `url(${imageUrl})`}}>
      <footer className="Chart__footer">
        <h3 className="Chart__title">
          {title} 
        </h3>
      </footer>
    </Link>
  );
}

export default Chart;
