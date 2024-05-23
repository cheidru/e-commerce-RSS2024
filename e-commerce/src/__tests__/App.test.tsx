import { describe, it, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store/store';
import App from '../App/App';
import * as Pages from '../pages/pages';

test('demo', () => {
  expect(true).toBe(true);
});

/* Header */
describe('render', () => {
  it('renders the main page Header', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Back call')).toBeInTheDocument();
  });
});

/* Footer */
describe('App component', () => {
  it('renders the main page and includes the Footer contact title', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Our phones')).toBeInTheDocument();
  });
});

/* Home page */
describe('render Home page', () => {
  it('renders Title on Home page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Home')).toBeInTheDocument();
  });
});
/* Catalog page */
describe('render Catalog page', () => {
  it('renders Title on Catalog page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Catalog />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Catalog')).toBeInTheDocument();
  });
});
/* Product page */
describe('render Product page', () => {
  it('renders Title on Product page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Product />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Product')).toBeInTheDocument();
  });
});
/* Basket page */
describe('render Basket page', () => {
  it('renders Title on Basket page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Basket />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Basket')).toBeInTheDocument();
  });
});
/* Profile page */
describe('render Profile page', () => {
  it('renders Title on Profile page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Profile />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Profile')).toBeInTheDocument();
  });
});
/* About page */
describe('render About page', () => {
  it('renders Title on About page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.About />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('About')).toBeInTheDocument();
  });
});
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
