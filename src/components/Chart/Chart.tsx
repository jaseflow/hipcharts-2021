import React from 'react';

interface ChartProps {
  items: any[];
}

function Chart({ type, items }: ChartProps) {

  return (
    <section className="flex flex--guts escape-header Chart">
      <div className="container flex flex--column flex--guts Chart__body">
        <h1>Chart</h1>
      </div>
    </section>
  );
}

export default Chart;
