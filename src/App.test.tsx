import React from 'react';
import ReactDOM from 'react-dom';

import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import App from './App';

it('renders without crashing', () => {
  const history = createMemoryHistory();
  const div = document.createElement('div');

  ReactDOM.render(<Router history={history}><App /></Router>, div);
})
