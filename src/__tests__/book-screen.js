import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppProviders } from 'context';
import App from 'App';

test('renders all the book information', async () => {
  render(<App />, { wrapper: AppProviders });
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
  screen.debug();

  const login = screen.getByRole('button', { name: /login/i });

  await userEvent.click(login);

  screen.debug();

  const loginModal = screen.getByRole('button', { name: /login/i });

  await userEvent.click(loginModal);

  screen.debug();
});
