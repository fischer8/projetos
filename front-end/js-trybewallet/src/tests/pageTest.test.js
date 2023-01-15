import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import Wallet from '../pages/Wallet';

it('Testes para a page wallet', () => {
  renderWithRouterAndRedux(<Wallet />);
  const email = screen.getByTestId('email-field');
  const total = screen.getByTestId('total-field');
  const header = screen.getByTestId('header-currency-field');
  const inputValue = screen.getByTestId('value-input');
  expect(email).toBeInTheDocument();
  expect(total).toBeInTheDocument();
  expect(header).toBeInTheDocument();
  expect(inputValue).toBeInTheDocument();
});
