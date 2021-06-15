import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import logoInline from '../../logo-inline.svg';

import { useLocation } from 'react-router-dom';

interface HeaderProps {
  hidden?: boolean;
}

function Header({ hidden } : HeaderProps) {

  let location = useLocation();

  const [ctaHidden, setCtaHidden] = useState(true);

  useEffect(() => {
    if(location.pathname.includes('/create/')) {
      setCtaHidden(false)
    } else if (!ctaHidden) {
      setCtaHidden(true)
    }
  }, [location, ctaHidden])

  return (
    <header className={`Header ${hidden ? 'Header--hidden' : ''}`}>
      <div className="container Header__container">
        <Link to="/"><img src={logoInline} className="Header__logo" alt="logo" /></Link>
        <Link to="/create" className="btn btn--secondary" hidden={ctaHidden}>New<span className="hide-mobile">&nbsp;chart</span></Link>
      </div>
    </header>
  );
}

export default Header;
