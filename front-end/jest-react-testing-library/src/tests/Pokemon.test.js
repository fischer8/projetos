import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const routeName = '/pokemons/25';

test('O nome correto do pokémon deve ser mostrado na tela', () => {
  renderWithRouter(<App />);
  const name = screen.getByText(/pikachu/i);
  expect(name).toBeInTheDocument();
});
test('O tipo correto do pokémon deve ser mostrado na tela', () => {
  renderWithRouter(<App />);
  const type = screen.getByTestId('pokemon-type');
  expect(type).toBeInTheDocument();
  expect(type.textContent).toEqual('Electric');
});
test('O peso médio do pokémon deve ser exibido com um texto', () => {
  renderWithRouter(<App />);
  const averageWeight = screen.getByText(/average weight: 6\.0 kg/i);
  expect(averageWeight).toBeInTheDocument();
});
test('A imagem do pokémon deve ser exibida', () => {
  renderWithRouter(<App />);
  const image = screen.getByRole('img', { name: /pikachu sprite/i });
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(image).toHaveAttribute('alt', 'Pikachu sprite');
});
test('Teste se o card do pokémon indicado na Pokédex contém um link de navegação', () => {
  const { history } = renderWithRouter(<App />);
  const link = screen.getByRole('link', { name: /more details/i });
  expect(link).toHaveAttribute('href', routeName);
  userEvent.click(link);
  const { pathname } = history.location;
  expect(pathname).toBe(routeName);
});
test('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push(routeName);
  });
  const checkBox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
  userEvent.click(checkBox);
  act(() => {
    history.push('/');
  });
  const favStar = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
  expect(favStar).toBeInTheDocument();
  expect(favStar).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  expect(favStar).toHaveAttribute('src', '/star-icon.svg');
});
