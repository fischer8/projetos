import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  renderWithRouter(<App />);
  const navLinks = screen.getAllByRole('link');
  expect(navLinks[0]).toHaveTextContent('Home');
  expect(navLinks[1]).toHaveTextContent('About');
  expect(navLinks[2]).toHaveTextContent('Favorite Pokémons');
});
test('Teste se a aplicação é redirecionada, ao clicar no link Home', () => {
  const { history } = renderWithRouter(<App />);
  const homeLink = screen.getByRole('link', { name: /home/i });
  userEvent.click(homeLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});
test('Teste se a aplicação é redirecionada, ao clicar no link About', () => {
  const { history } = renderWithRouter(<App />);
  const AboutLink = screen.getByRole('link', { name: /about/i });
  userEvent.click(AboutLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});
test('Teste se a aplicação é redirecionada, ao clicar no link Pokemons', () => {
  const { history } = renderWithRouter(<App />);
  const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
  userEvent.click(favoriteLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});
test('Teste se a aplicação é redirecionada para a página Not Found', () => {
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push('/kaelgh');
  });
  const notFoundText = screen.getByRole('heading', { name: /page requested not found/i });
  expect(notFoundText).toBeInTheDocument();
});
