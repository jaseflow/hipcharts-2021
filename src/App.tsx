import React, { useEffect, useState, useRef } from 'react';
import ReactGA from 'react-ga';

import Header from './components/Header/Header';
import Intro from './components/Intro/Intro';
import Chart from './components/Chart/Chart';
import Charts from './components/Charts/Charts';
import UserCharts from './components/UserCharts/UserCharts';
import Create from './components/Create/Create';
import StickyFooter from './components/StickyFooter/StickyFooter';

import {
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';

function App() {

  let location = useLocation();

  const [headerHidden, setHeaderHidden] = useState(false)
  const [footerHidden, setFooterHidden] = useState(false)

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

  }, [headerHidden, location, prevLocation])

  return (
    <div className="App">
      <Header hidden={headerHidden} />
      <Switch>
        <Route path="/" exact children={<Intro />} />
        <Route path="/create" exact children={<Create />} />
        <Route path="/chart" children={<Chart />} />
        <Route path="/charts" children={<Charts />} />
        <Route path="/user-charts" children={<UserCharts />} />
      </Switch>
      <div className="hide-desktop">
        <StickyFooter visible={!footerHidden} />
      </div>
    </div>
  );
}

export default App;
