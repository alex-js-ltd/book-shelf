import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { AppProviders } from 'context';
import App from 'App';

test('renders all the book information', async () => {
  render(<App />, { wrapper: AppProviders });
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
  screen.debug();
});
