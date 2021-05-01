import React from 'react';
import { render, screen } from '@testing-library/react';

import Intro from './Intro';

it('displayed the intro title', () => {
  const title = 'Create top five charts for your favourite music'
  render(<Intro />);
  expect(screen.getByText(title)).toBeInTheDocument();
})
