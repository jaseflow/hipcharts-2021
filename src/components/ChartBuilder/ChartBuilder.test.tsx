import React from 'react';
import ReactDOM from 'react-dom';

import ChartBuilder from './ChartBuilder';

import { render, screen } from '@testing-library/react';

// TeamPage.test.js
jest.mock('react-router-dom', () => ({
  useParams: () => ({
    chart: 'artists',
  })
}));

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<ChartBuilder />, div);
})

it('displays the correct title', () => {
  const title = 'Top 5 Artists Of All Time';
  const { getByText } = render( <ChartBuilder />)
  expect(getByText(title)).toBeInTheDocument();
})
