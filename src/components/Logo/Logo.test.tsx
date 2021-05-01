import React from 'react';
import ReactDOM from 'react-dom';

import Logo from './Logo';
import logoInline from '../../logo-inline.svg';
import logoStacked from '../../logo-stacked.svg';

import { render } from '@testing-library/react';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Logo />, div);
})

it('renders inline logo by default', () => {
  const {getByTestId} = render(<Logo />);
  expect(getByTestId('logo')).toHaveAttribute('src',logoInline);
})

it('renders stacked logo when set', () => {
  const {getByTestId} = render(<Logo style="stacked" />);
  expect(getByTestId('logo')).toHaveAttribute('src',logoStacked);
})
