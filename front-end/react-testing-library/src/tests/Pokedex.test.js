import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
  renderWithRouter(<App />);
  const text = screen.getByRole('heading', { name: /encountered pokémons/i, level: 2 });
  expect(text).toBeInTheDocument();
});
test('Teste se é exibido o próximo quando o botão Próximo pokémon é clicado', () => {
  renderWithRouter(<App />);
  const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
  expect(nextButton).toHaveTextContent('Próximo pokémon');
  userEvent.click(nextButton);
  const nextPokemon = screen.getByText(/charmander/i);
  expect(nextPokemon).toBeInTheDocument();
});
test('Teste se é mostrado apenas um pokémon por vez', () => {
  renderWithRouter(<App />);
  const pokemon = screen.getAllByAltText(/sprite/i);
  expect(pokemon).toHaveLength(1);
});
test('Teste se a Pokédex tem os botões de filtro', () => {
  renderWithRouter(<App />);
  const buttons = screen.getAllByTestId('pokemon-type-button');
  const allButton = screen.getByRole('button', { name: /all/i });
  buttons.forEach((button) => {

  });
  const pokemonTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
  expect(buttons[0]).toHaveTextContent();
  expect(buttons[1]).toHaveTextContent('Fire');
  expect(buttons[2]).toHaveTextContent('Bug');
  expect(buttons[3]).toHaveTextContent('Poison');
  expect(buttons[4]).toHaveTextContent('Psychic');
  expect(buttons[5]).toHaveTextContent('Normal');
  expect(buttons[6]).toHaveTextContent('Dragon');
  expect(allButton).toBeInTheDocument();
});
test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  renderWithRouter(<App />);
  const bugButton = screen.getByRole('button', { name: /bug/i });
  expect(bugButton).toBeInTheDocument();
  userEvent.click(bugButton);
  const caterpie = screen.getByText(/caterpie/i);
  expect(caterpie).toBeInTheDocument();
  const allButton = screen.getByRole('button', { name: /all/i });
  userEvent.click(allButton);
  const pikachu = screen.getByText(/pikachu/i);
  expect(pikachu).toBeInTheDocument();
});
