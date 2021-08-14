import React from 'react';

import { Link } from 'react-router-dom';

interface IntroCtaProps {
  small?: boolean;
  secondary?: boolean;
  to: string;
  text: string;
}

function IntroCta({ small, to, text, secondary }: IntroCtaProps) {
  return (
    <Link
      to={to}
      data-testid={`cta-${to}`}
      className={
        `btn
        ${!small ? 'btn--large' : ''}
        ${secondary ? 'btn--secondary' : ''}
        `
      }>
      { text }
    </Link>
  );
}

export default IntroCta;
