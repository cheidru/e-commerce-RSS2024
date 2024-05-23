import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store/store';
import * as Pages from '../pages/pages';

/* Login page */
describe('render Login page', () => {
  it('renders Title on Login page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Login />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText('Login').length === 2).toBeTruthy();
  });
});

/* Label */
describe('checking input labels on Login page', () => {
  it('checking input label for email on Login page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Login />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText('Email*'));
  });
});

describe('checking input labels on Login page', () => {
  it('checking input label for password on Login page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Login />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText('Password*'));
  });
});

/* placeholder */
describe('checking input placeholder on Login page', () => {
  it('checking input placeholder for email on Login page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Login />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText('example@email.com'));
  });
});

/* checking input fields */
describe('checking input value on Login page', () => {
  it('checking input value for email on Login page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Login />
        </MemoryRouter>
      </Provider>
    );

    const email = document.getElementById('email') as HTMLInputElement;
    if (email) email.value = 'alex@gmail.com';

    expect(screen.getByDisplayValue('alex@gmail.com') === email);
  });
});

/* Wrong value */
describe('checking input wrong value on Login page', () => {
  it('checking input wrong value for email on Login page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Login />
        </MemoryRouter>
      </Provider>
    );

    const email = document.getElementById('email') as HTMLInputElement;

    fireEvent.change(email, { target: { value: '  some@gmail.com ' } });

    expect(await screen.findByText('Email must not contain spaces'));
  });
});
