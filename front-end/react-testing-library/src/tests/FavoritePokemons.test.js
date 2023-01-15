import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { FavoritePokemons } from '../pages';

test('Teste se é exibida na tela a mensagem No favorite pokemon found', () => {
  renderWithRouter(<FavoritePokemons />);
  const message = screen.getByText(/no favorite pokemon found/i);
  expect(message).toBeInTheDocument();
});
test('Teste se são exibidos todos os cards de pokémons favoritados', () => {
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push('/pokemons/25');
  });
  const checkBox1 = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
  userEvent.click(checkBox1);
  act(() => {
    history.push('/pokemons/10');
  });
  const checkBox2 = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
  userEvent.click(checkBox2);
  act(() => {
    history.push('/favorites');
  });
  const pikachu = screen.getByText(/pikachu/i);
  const caterpie = screen.getByText(/caterpie/i);
  expect(pikachu).toBeInTheDocument();
  expect(caterpie).toBeInTheDocument();
});
