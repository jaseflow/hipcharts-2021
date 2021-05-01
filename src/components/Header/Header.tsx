import React from 'react';

import logoInline from '../../logo-inline.svg';

function Header() {
  return (
    <header className="Header">
      <img src={logoInline} className="Header__logo" alt="logo" />
    </header>
  );
}

export default Header;
