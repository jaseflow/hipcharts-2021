import React from 'react';
import ReactDOM from 'react-dom';

import ChartBuilderSearch from './ChartBuilderSearch';

import { render, screen } from '@testing-library/react';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<ChartBuilderSearch />, div);
})

it('renders correctly', () => {
  const { getByTestId } = render( <ChartBuilderSearch />)
  expect(getByTestId('search')).toBeInTheDocument();
})

it('displays the correct placeholder', () => {
  const chartType = 'artists'
  const { getByTestId } = render( <ChartBuilderSearch chartType="artists" />)
  expect(getByTestId('search')).toHaveAttribute('placeholder', 'Search for artists')
})
