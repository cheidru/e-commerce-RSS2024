import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store/store';
import * as Pages from '../pages/pages';

/* Registration page */
describe('render Registration page', () => {
  it('renders Title on Registration page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Registration')).toBeInTheDocument();
  });
});

/* Empty choose empty value Country */
describe('checking choose empty value Country on Registration page', () => {
  it('must be error message when empty value in country on Registration page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    const addressCountry = document.getElementById(
      'address.country'
    ) as HTMLInputElement;

    fireEvent.change(addressCountry, { target: { value: '-' } });
    fireEvent.blur(addressCountry);

    expect(await screen.findByText('Country is required'));
  });
});

/* Correct value PostalCode for Belarus */
describe('checking input correct value on Registration page', () => {
  it('must not be error message when input correct value in Postal Code for country Belarus on Registration page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    const addressCountry = document.getElementById(
      'address.country'
    ) as HTMLInputElement;
    // console.log(addressCountry);
    const postalCode = document.getElementById(
      'address.postalCode'
    ) as HTMLInputElement;

    fireEvent.change(addressCountry, { target: { value: 'BY' } });
    fireEvent.blur(addressCountry);

    fireEvent.change(postalCode, { target: { value: '200000' } });

    expect(
      await screen
        .findByText('Postal code must be 2#####')
        .then(() => false)
        .catch(() => true)
    ).toBeTruthy();
  });
});

/* Wrong value PostalCode for Belarus */
describe('checking input wrong value on Registration page', () => {
  it('must be error message when input wrong value in Postal code for country Belarus on Registration page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    const addressCountry = document.getElementById(
      'address.country'
    ) as HTMLInputElement;
    // console.log(addressCountry);
    const postalCode = document.getElementById(
      'address.postalCode'
    ) as HTMLInputElement;

    fireEvent.change(addressCountry, { target: { value: 'BY' } });
    fireEvent.blur(addressCountry);

    fireEvent.change(postalCode, { target: { value: '100000' } });

    expect(await screen.findByText('Postal code must be 2#####'));
  });
});

/* Correct value PostalCode for Georgia */
describe('checking input correct value on Registration page', () => {
  it('must not be error message when input correct value in Postal Code for country Georgia on Registration page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    const addressCountry = document.getElementById(
      'address.country'
    ) as HTMLInputElement;
    // console.log(addressCountry);
    const postalCode = document.getElementById(
      'address.postalCode'
    ) as HTMLInputElement;

    fireEvent.change(addressCountry, { target: { value: 'GE' } });
    fireEvent.blur(addressCountry);

    fireEvent.change(postalCode, { target: { value: '2000' } });

    expect(
      await screen
        .findByText('Postal code must be 4 digit')
        .then(() => false)
        .catch(() => true)
    ).toBeTruthy();
  });
});

/* Wrong value PostalCode for Georgia */
describe('checking input wrong value on Registration page', () => {
  it('must be error message when input wrong value in Postal code for country Georgia on Registration page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    const addressCountry = document.getElementById(
      'address.country'
    ) as HTMLInputElement;
    // console.log(addressCountry);
    const postalCode = document.getElementById(
      'address.postalCode'
    ) as HTMLInputElement;

    fireEvent.change(addressCountry, { target: { value: 'GE' } });
    fireEvent.blur(addressCountry);

    fireEvent.change(postalCode, { target: { value: '100' } });

    expect(await screen.findByText('Postal code must be 4 digit'));
  });
});

/* Correct value PostalCode for Russia */
describe('checking input correct value on Registration page', () => {
  it('must not be error message when input correct value in Postal Code for country Russia on Registration page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    const addressCountry = document.getElementById(
      'address.country'
    ) as HTMLInputElement;
    // console.log(addressCountry);
    const postalCode = document.getElementById(
      'address.postalCode'
    ) as HTMLInputElement;

    fireEvent.change(addressCountry, { target: { value: 'RU' } });
    fireEvent.blur(addressCountry);

    fireEvent.change(postalCode, { target: { value: '200000' } });

    expect(
      await screen
        .findByText('Postal code must be 6 digit')
        .then(() => false)
        .catch(() => true)
    ).toBeTruthy();
  });
});

/* Wrong value PostalCode for Georgia */
describe('checking input wrong value on Registration page', () => {
  it('must be error message when input wrong value in Postal code for country Russia on Registration page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    const addressCountry = document.getElementById(
      'address.country'
    ) as HTMLInputElement;
    // console.log(addressCountry);
    const postalCode = document.getElementById(
      'address.postalCode'
    ) as HTMLInputElement;

    fireEvent.change(addressCountry, { target: { value: 'RU' } });
    fireEvent.blur(addressCountry);

    fireEvent.change(postalCode, { target: { value: '1000000' } });

    expect(await screen.findByText('Postal code must be 6 digit'));
  });
});
