import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import logoInline from '../../logo-inline.svg';

import { useLocation } from 'react-router-dom';

interface HeaderProps {
  hidden?: boolean;
}

function Header({ hidden } : HeaderProps) {

  let location = useLocation();

  const [ctaHidden, setCtaHidden] = useState(false);
  const [transparent, setTransparent] = useState(false);

  useEffect(() => {
    if(location.pathname.includes('/create') || location.pathname.includes('/admin')) {
      setCtaHidden(true)
    } else if(location.pathname.includes('/charts')) {
      setCtaHidden(false)
    } else if(location.pathname.includes('/chart') && window.innerWidth > 768) {
      setTransparent(true)
    }
  }, [location, ctaHidden])

  return (
    <header className={
        `Header 
        ${hidden ? 'Header--hidden' : ''}
         ${transparent ? 'Header--transparent' : ''}
      `}>
      <div className="container Header__container">
        <Link to="/charts"><img src={logoInline} className="Header__logo" alt="logo" /></Link>
        <Link
          to="/create"
          className={`btn Header__cta ${ctaHidden ? '' : 'Header__cta--visible'}`}>
          Create new chart
        </Link>
      </div>
    </header>
  );
}

export default Header;
