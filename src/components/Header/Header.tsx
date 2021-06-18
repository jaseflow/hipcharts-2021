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
      setCtaHidden(true)
    } else {
      setCtaHidden(false)
    }
  }, [location, ctaHidden])

  return (
    <header className={`Header ${hidden ? 'Header--hidden' : ''}`}>
      <div className="container Header__container">
        <Link to="/charts"><img src={logoInline} className="Header__logo" alt="logo" /></Link>
        <Link
          to="/create"
          className={`btn btn--secondary Header__cta ${ctaHidden ? '' : 'Header__cta--visible'}`}>
          New <span className="hide-mobile">&nbsp;chart</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
