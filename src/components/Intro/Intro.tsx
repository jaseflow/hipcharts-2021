import React from 'react';

import { Link } from 'react-router-dom';

import IntroCta from './IntroCta';
import ArtistWall from '../ArtistWall/ArtistWall';

import logoStacked from '../../logo-stacked.svg';

function Intro() {

  return (
    <div>
      <ArtistWall />
      <section className="Intro">
        <div className="flex flex--guts flex--column">
          <div className="container">
            <img src={logoStacked} className="Intro__logo" alt="logo" />
            <h1 className="Intro__title title title--large">Create and share top five charts</h1>
            <div className="Intro__footer">
              <IntroCta />
              <Link to="/charts" className="btn btn--secondary btn--large">Browse charts</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Intro;
