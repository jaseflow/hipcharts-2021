import React from 'react';
import ReactDOM from 'react-dom';

import ChartBuilderItem from './ChartBuilderItem';

import { render, screen } from '@testing-library/react';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<ChartBuilderItem />, div);
})

it('shows placeholder text if no name', () => {
  const placeholder = 'Choose artists';
  const { getByText } = render( <ChartBuilderItem chartType="artists" />)
  expect(getByText(placeholder)).toBeInTheDocument();
})

it('shows name if it exists', () => {
  const name = 'Drake';
  const { getByText } = render( <ChartBuilderItem name="Drake" />)
  expect(getByText(name)).toBeInTheDocument();
})
