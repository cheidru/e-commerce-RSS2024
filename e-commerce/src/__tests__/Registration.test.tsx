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

/* Label */
describe('checking input labels on Registration page', () => {
  it('checking input label for email on Registration page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText('Email*'));
  });
});

describe('checking input labels on Registration page', () => {
  it('checking input label for password on Registration page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText('Password*'));
  });
});

describe('checking input labels on Registration page', () => {
  it('checking input label for first name on Registration page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText('first Name*'));
  });
});

describe('checking input labels on Registration page', () => {
  it('checking input label for last name on Registration page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText('last Name*'));
  });
});

describe('checking input labels on Registration page', () => {
  it('checking input label for date of birth on Registration page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText('Date of Birth*'));
  });
});

describe('checking input labels on Registration page', () => {
  it('checking input label for city on Registration page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByLabelText('City*'));
  });
});

describe('checking input labels on Registration page', () => {
  it('checking input label for country on Registration page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByLabelText('Country*'));
  });
});

describe('checking input labels on Registration page', () => {
  it('checking input label for POST code on Registration page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByLabelText('POST Code*'));
  });
});

/* checking input fields */
describe('checking input value on Registration page', () => {
  it('checking input value for email on Registration page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    const email = document.getElementById('email') as HTMLInputElement;
    if (email) email.value = 'alex@gmail.com';

    expect(screen.getByDisplayValue('alex@gmail.com') === email);
  });
});

describe('checking input value on Registration page', () => {
  it('checking input value for password on Registration page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    const password = document.getElementById('password') as HTMLInputElement;
    if (password) password.value = 'oopsIdidit2times';

    expect(screen.getByDisplayValue('oopsIdidit2times') === password);
  });
});

describe('checking input value on Registration page', () => {
  it('checking input value for first name on Registration page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    const firstName = document.getElementById('firstName') as HTMLInputElement;
    if (firstName) firstName.value = 'John';

    expect(screen.getByDisplayValue('John') === firstName);
  });
});

describe('checking input value on Registration page', () => {
  it('checking input value for last name on Registration page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    const lastName = document.getElementById('lastName') as HTMLInputElement;
    if (lastName) lastName.value = 'Dou';

    expect(screen.getByDisplayValue('Dou') === lastName);
  });
});

/* Wrong value */
describe('checking input wrong value on Registration page', () => {
  it('checking input wrong value for email on Registration page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    const email = document.getElementById('email') as HTMLInputElement;

    fireEvent.change(email, { target: { value: '  some@gmail.com ' } });

    expect(await screen.findByText('Email must not contain spaces'));
  });
});

describe('checking input wrong value on Registration page', () => {
  it('checking input wrong value for password on Registration page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    const password = document.getElementById('password') as HTMLInputElement;

    fireEvent.change(password, { target: { value: 'oopsididit2times' } });

    expect(
      await screen.findByText(
        'Password must contain at least one uppercase letter'
      )
    );
  });
});

describe('checking input wrong value on Registration page', () => {
  it('checking input wrong value for first name on Registration page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    const firstName = document.getElementById('firstName') as HTMLInputElement;

    fireEvent.change(firstName, { target: { value: 'Jo5n' } });

    expect(
      await screen.findByText(
        'First name must contain at least one character and no special characters or numbers'
      )
    );
  });
});

describe('checking input wrong value on Registration page', () => {
  it('checking input wrong value for last name on Registration page', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Pages.Registration />
        </MemoryRouter>
      </Provider>
    );

    const lastName = document.getElementById('lastName') as HTMLInputElement;

    fireEvent.change(lastName, { target: { value: 'D5u' } });

    expect(
      await screen.findByText(
        'Last name must contain at least one character and no special characters or numbers'
      )
    );
  });
});
