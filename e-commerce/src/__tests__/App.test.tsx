import { describe, it, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App/App';

test('demo', () => {
  expect(true).toBe(true);
});

describe('render', () => {
  it('renders the main page Header', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.queryByText('Back call')).toBeInTheDocument();
  });
});

describe('App component', () => {
  it('renders the main page and includes the Footer contact title', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Our contacts')).toBeInTheDocument();
  });
});
