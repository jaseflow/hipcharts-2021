import React, { useEffect, useState, useRef } from 'react';

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
    title: 'Rappers',
    imageUrl: 'https://i.scdn.co/image/5c8d57d92825466637905f0d4219064cb39333e9',
  },
  {
    id: 'albums',
    title: 'Albums',
    imageUrl: 'https://i.scdn.co/image/ab67616d0000b273557341c7755b44dc1a838f1c',
  }
]

function App() {

  let location = useLocation();

  const [headerHidden, setHeaderHidden] = useState(false)
  const [refreshingChart, setRefreshingChart ] = useState(false)

  const usePrevious = <T extends unknown>(value: T): T | undefined => {
    const ref = useRef<T>();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevLocation = usePrevious(location);

  useEffect(() => {
    if (location.pathname === '/') {
      setHeaderHidden(true)
    } else if (headerHidden) {
      setHeaderHidden(false)
    }
    if (prevLocation && prevLocation.pathname.includes('/charts/')) {
      setRefreshingChart(true)
    }
    setTimeout(() => {
      setRefreshingChart(false)
    }, 600)
  }, [headerHidden, location])

  return (
    <div className="App">
      <Header hidden={headerHidden} />
      <Switch>
        <Route path="/" exact children={<Intro />} />
        <Route path="/charts" exact children={<Charts charts={charts} />} />
        <Route path="/charts/:chart" children={<ChartBuilder refresh={refreshingChart} />} />
      </Switch>
    </div>
  );
}

export default App;
