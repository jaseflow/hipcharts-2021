import React from 'react';

import logoStacked from '../../logo-stacked.svg';

function Intro() {
  return (
    <section className="Intro">
      <img src={logoStacked} className="Intro__logo" alt="logo" />
    </section>
  );
}

export default Intro;
