import React from 'react';

import { Link } from 'react-router-dom';

function IntroCta() {
  return (
    <Link to="/create" data-testid="cta" className="btn btn--large">Get started</Link>
  );
}

export default IntroCta;
