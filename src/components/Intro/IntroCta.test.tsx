import React from 'react';
import ReactDOM from 'react-dom';

import IntroCta from './IntroCta';

import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';

it('renders without crashing', () => {
  const history = createMemoryHistory();
  const div = document.createElement('div');

  ReactDOM.render(<Router history={history}><IntroCta /></Router>, div);
})

it('has a link to charts page', () => {
  const history = createMemoryHistory();
  const url = '/charts';

  render(
    <Router history={history}>
      <IntroCta />
    </Router>
  )
  expect(screen.getByTestId('cta')).toHaveAttribute('href', url);
})
