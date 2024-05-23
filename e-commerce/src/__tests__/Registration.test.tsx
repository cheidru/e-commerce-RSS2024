import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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
