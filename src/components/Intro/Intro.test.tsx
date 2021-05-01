import React from 'react';
import ReactDOM from 'react-dom';

import Intro from './Intro';

import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';

it('renders without crashing', () => {
  const history = createMemoryHistory();
  const div = document.createElement('div');

  ReactDOM.render(<Router history={history}><Intro /></Router>, div);
})

it('has a link to charts page', () => {
  const history = createMemoryHistory();
  const title = 'Create top five charts of your favourite music';

  const { getByText } = render(
    <Router history={history}>
      <Intro />
    </Router>
  )
  expect(getByText(title)).toBeInTheDocument();
})
