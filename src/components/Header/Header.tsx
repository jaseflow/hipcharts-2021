import React from 'react';

import { Link } from 'react-router-dom';

import logoInline from '../../logo-inline.svg';

interface HeaderProps {
  hidden?: boolean;
}

function Header({ hidden } : HeaderProps) {
  return (
    <header className={`Header ${hidden ? 'Header--hidden' : ''}`}>
      <Link to="/"><img src={logoInline} className="Header__logo" alt="logo" /></Link>
    </header>
  );
}

export default Header;
