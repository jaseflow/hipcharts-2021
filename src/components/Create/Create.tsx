import React, { useState } from 'react';

import ChartBuilder from '../ChartBuilder/ChartBuilder';
import ChartQueryBuilder from '../ChartQueryBuilder/ChartQueryBuilder';

function Create() {

  const [chartData, setChartData] = useState<any>({});

  return (
    <section className="escape-header Create">
      {!chartData.name
        ? 
          <div className="page-container container container--small">
            <ChartQueryBuilder onBuild={(c: any) => setChartData(c)} />
          </div>
        : (
          <ChartBuilder
            artist={chartData.artist}
            query={chartData.query}
            chartType={chartData.type}
            title={chartData.name} />
          )
      }
    </section>
  );
}

export default Create;
