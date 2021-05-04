import React, { useEffect, useState } from 'react';

import Header from './components/Header/Header';
import Intro from './components/Intro/Intro';
import Charts from './components/Charts/Charts';
import ChartBuilder from './components/ChartBuilder/ChartBuilder';

import {
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';

const charts = [
  {
    id: 'artists',
    title: 'Top 5 Artists',
    subTitle: 'Of All Time',
    imageUrl: 'https://i.scdn.co/image/5c8d57d92825466637905f0d4219064cb39333e9',
  },
  {
    id: 'albums',
    title: 'Top 5 Albums',
    subTitle: 'Of All Time',
    imageUrl: 'https://i.scdn.co/image/ab67616d0000b273557341c7755b44dc1a838f1c',
  }
]

function App() {

  let location = useLocation();

  const [headerHidden, setHeaderHidden] = useState(false)

  useEffect(() => {
    if (location.pathname === '/') {
      setHeaderHidden(true)
    } else if (headerHidden) {
      setHeaderHidden(false)
    }
  }, [headerHidden, location])

  return (
    <div className="App">
      <Header hidden={headerHidden} />
      <Switch>
        <Route path="/" exact children={<Intro />} />
        <Route path="/charts" exact children={<Charts charts={charts} />} />
        <Route path="/charts/:chart" children={<ChartBuilder />} />
      </Switch>
    </div>
  );
}

export default App;
