import React from 'react';

import { Link } from 'react-router-dom';

interface IntroCtaProps {
  small?: boolean;
}

function IntroCta({ small }: IntroCtaProps) {
  return (
    <Link to="/create" data-testid="cta" className={`btn ${!small ? 'btn--large' : ''}`}>Create a chart</Link>
  );
}

export default IntroCta;
