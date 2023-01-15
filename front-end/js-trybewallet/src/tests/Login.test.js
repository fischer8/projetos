import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

it('Verifica se os inputs estão na tela', () => {
  const { history } = renderWithRouterAndRedux(<App />);
  const { location: { pathname } } = history;
  expect(pathname).toBe('/');
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

it('Testa se o botão funciona corretamente', async () => {
  const { history } = renderWithRouterAndRedux(<App />);
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const button = screen.getByRole('button', { name: /entrar/i });
  userEvent.type(emailInput, 'masdm@masd.com');
  userEvent.type(passwordInput, 'sdskl');
  expect(button).toBeDisabled();
  userEvent.type(passwordInput, 'sdsklsafdgfh');
  expect(button).toBeEnabled();
  userEvent.click(button);
  await waitFor(() => {
    expect(screen.getByText('TrybeWallet')).toBeInTheDocument();
  });
  expect(history.location.pathname).toBe('/carteira');
});
