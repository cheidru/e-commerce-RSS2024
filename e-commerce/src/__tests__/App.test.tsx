import { describe, it, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App/App';

test('demo', () => {
  expect(true).toBe(true);
});

describe('render', () => {
  it('renders the main page', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    screen.getByText('ASInc store');
  });
});
