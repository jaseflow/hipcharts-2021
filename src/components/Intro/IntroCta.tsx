import React from 'react';

import { Link } from 'react-router-dom';

function IntroCta() {
  return (
    <Link to="/create" data-testid="cta" className="btn btn--large">Create a chart</Link>
  );
}

export default IntroCta;
