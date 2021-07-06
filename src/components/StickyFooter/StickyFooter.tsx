import React from 'react';

import { Link } from 'react-router-dom';

interface StickyFooterProps {
  visible?: boolean;
}

function StickyFooter({ visible }: StickyFooterProps) {
  return (
    <footer className={`StickyFooter ${visible ? 'StickyFooter--visible' : ''}`}> 
      <Link
        to="/create"
        className="btn">
        Create new chart
      </Link>
    </footer>
  )
}

export default StickyFooter;
