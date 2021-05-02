import React from 'react';

import IntroCta from './IntroCta';

import logoStacked from '../../logo-stacked.svg';

function Intro() {
  return (
    <section className="Intro">
      <div className="container">
        <div className="flex flex--guts flex--column">
          <img src={logoStacked} className="Intro__logo" alt="logo" />
          <h1 className="Intro__title title">Create and share top five charts</h1>
          <IntroCta />
        </div>
      </div>
    </section>
  );
}

export default Intro;
