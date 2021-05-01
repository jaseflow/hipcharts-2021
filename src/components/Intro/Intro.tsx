import React from 'react';

import IntroCta from './IntroCta';

import logoStacked from '../../logo-stacked.svg';

function Intro() {
  return (
    <section className="Intro">
      <div>
        <img src={logoStacked} className="Intro__logo" alt="logo" />
        <h1>Create top five charts for your favourite music</h1>
        <IntroCta />
      </div>
    </section>
  );
}

export default Intro;
