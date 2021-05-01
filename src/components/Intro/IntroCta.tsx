import React from 'react';

import { Link } from 'react-router-dom';

function IntroCta() {
  return (
    <Link to="/charts" data-testid="cta" className="btn">Get started</Link>
  );
}

export default IntroCta;
