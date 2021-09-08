import React, { useEffect, useState, useRef } from 'react';
import ReactGA from 'react-ga';

import { ChartContext, ChartType } from './chart-context';

import Header from './components/Header/Header';
import Intro from './components/Intro/Intro';
import Chart from './components/Chart/Chart';
import Charts from './components/Charts/Charts';
import UserCharts from './components/UserCharts/UserCharts';
import ChartOptions from './components/ChartOptions/ChartOptions';
import ChartBuilder from './components/ChartBuilder/ChartBuilder';
import StickyFooter from './components/StickyFooter/StickyFooter';

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
  const [footerHidden, setFooterHidden] = useState(false)
  const [refreshingChart, setRefreshingChart ] = useState(false)

  const [activeChart, setActiveChart] = useState({} as ChartType);

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

    // Yuck
    if (location.pathname === '/') {
      setHeaderHidden(true)
      setFooterHidden(true)
    } else if (location.pathname.includes('/create')) {
      setHeaderHidden(false)
      setFooterHidden(true)
    } else {
      setHeaderHidden(false)
      setFooterHidden(false)
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
      <ChartContext.Provider value={activeChart}>
        <Switch>
          <Route path="/" exact children={<Intro />} />
          <Route path="/create" exact children={<ChartOptions onCreate={(c: any) => setActiveChart(c)} charts={charts} />} />
          <Route path="/create/:chart" children={<ChartBuilder refresh={refreshingChart} />} />
          <Route path="/chart" children={<Chart />} />
          <Route path="/charts" children={<Charts />} />
          <Route path="/user-charts" children={<UserCharts />} />
        </Switch>
      </ChartContext.Provider>
      <div className="hide-desktop">
        <StickyFooter visible={!footerHidden} />
      </div>
    </div>
  );
}

export default App;
