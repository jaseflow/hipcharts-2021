import React from 'react';

import { useParams } from 'react-router-dom';

function ChartBuilder() {

  let { chart } = useParams();

  return (
    <section class="ChartBuilder escape-header">
      <div className="container flex flex--guts">
        <h1 className="title title--large">
          { chart }
        </h1>
      </div>
    </section>
  );
}

export default ChartBuilder;
