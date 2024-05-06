import { describe, it, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App/App';

test('demo', () => {
  expect(true).toBe(true);
});

describe('render', () => {
  it('renders the main page', () => {
    render(<App />);
    screen.getByText('ASInc store');
  });
});
