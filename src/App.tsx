import React, { useEffect, useState, useRef } from 'react';
import ReactGA from 'react-ga';

import Header from './components/Header/Header';
import Intro from './components/Intro/Intro';
import Chart from './components/Chart/Chart';
import Charts from './components/Charts/Charts';
import ChartOptions from './components/ChartOptions/ChartOptions';
import ChartBuilder from './components/ChartBuilder/ChartBuilder';

import {
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';

const charts = [
  {
    id: 'artists',
    title: 'Top 5 Rappers',
    subTitle: 'Of All Time',
    imageUrl: 'https://i.scdn.co/image/5c8d57d92825466637905f0d4219064cb39333e9',
    link: '/create/artists',
  },
  {
    id: 'albums',
    title: 'Top 5 Albums',
    subTitle: 'Of All Time',
    imageUrl: 'https://i.scdn.co/image/ab67616d0000b273557341c7755b44dc1a838f1c',
    link: '/create/albums',
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

    ReactGA.set({ page: location.pathname }); // Update the user's current page
    ReactGA.pageview(location.pathname); // Record a pageview for the given page

    if (location.pathname === '/') {
      setHeaderHidden(true)
    } else if (headerHidden) {
      setHeaderHidden(false)
    }

    if (prevLocation && prevLocation.pathname.includes('/create/')) {
      setRefreshingChart(true)
    }

    setTimeout(() => {
      setRefreshingChart(false)
    }, 600)
  }, [headerHidden, location, prevLocation])

  return (
    <div className="App">
      <Header hidden={headerHidden} />
      <Switch>
        <Route path="/" exact children={<Intro />} />
        <Route path="/create" exact children={<ChartOptions charts={charts} />} />
        <Route path="/create/:chart" children={<ChartBuilder refresh={refreshingChart} />} />
        <Route path="/chart" children={<Chart />} />
        <Route path="/charts" children={<Charts />} />
      </Switch>
    </div>
  );
}

export default App;
