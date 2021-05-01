import React from 'react';

import logoInline from '../../logo-inline.svg';

interface HeaderProps {
  hidden?: boolean;
}

function Header({ hidden } : HeaderProps) {
  return (
    <header className={`Header ${hidden ? 'Header--hidden' : ''}`}>
      <img src={logoInline} className="Header__logo" alt="logo" />
    </header>
  );
}

export default Header;
