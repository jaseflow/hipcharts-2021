import React from 'react';
import { render, screen } from '@testing-library/react';

import IntroCta from './IntroCta';

it('links to the charts page', () => {
  const url = '/charts'
  render(<IntroCta />);
  expect(screen.getByTestId('cta')).toHaveAttribute('href', url);
})
