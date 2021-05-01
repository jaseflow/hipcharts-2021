import React from 'react';

import Header from './components/Header/Header';
import Intro from './components/Intro/Intro';
import Charts from './components/Charts/Charts';
import ChartBuilder from './components/ChartBuilder/ChartBuilder';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

const charts = [
  {
    id: 'artists',
    title: 'Top 5 Artists',
    subTitle: 'Of All Time',
    imageUrl: 'https://i.scdn.co/image/4cb57ae1ef87546455db9cf65ba414c311ff459a',
  },
  {
    id: 'albums',
    title: 'Top 5 Albums',
    subTitle: 'Of All Time',
    imageUrl: 'https://i.scdn.co/image/ab67616d0000b27353f6fa0d2589c6a7174f4b81',
  },
  {
    id: 'tracks',
    title: 'Top 5 Tracks',
    subTitle: 'Of All Time',
    imageUrl: 'https://i.scdn.co/image/ab67616d0000b2739820181489bad70372f19b94',
  },
]

function App() {

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact children={<Intro />} />
          <Route path="/charts" exact children={<Charts charts={charts} />} />
          <Route path="/charts/:chart" children={<ChartBuilder />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
