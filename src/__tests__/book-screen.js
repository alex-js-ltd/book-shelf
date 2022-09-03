import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppProviders } from 'context';
import App from 'App';

test('renders all the book information', async () => {
  render(<App />, { wrapper: AppProviders });
  screen.debug();
});
