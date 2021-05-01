import React from 'react';

import logoInline from '../../logo-inline.svg';
import logoStacked from '../../logo-stacked.svg';

interface LogoProps {
  style: string;
}

function Logo({ style } : LogoProps) {
  const url = style === 'stacked' ? logoStacked : logoInline;
  return (
    <img src={url} data-testid="logo" className="Logo" alt="logo" />
  );
}

export default Logo;
