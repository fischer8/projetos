import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Teste se as informações detalhadas do pokémon selecionado são mostradas', () => {
  renderWithRouter(<App />);
  const link = screen.getByRole('link', { name: /more details/i });
  userEvent.click(link);
  const pikaDetails = screen.getByRole('heading', { name: /pikachu details/i });
  const summary = screen.getByRole('heading', { name: /summary/i, level: 2 });
  const details = screen.getByText(/with electricity to make/i);
  expect(link).not.toBeInTheDocument();
  expect(pikaDetails).toBeInTheDocument();
  expect(summary).toBeInTheDocument();
  expect(details).toBeInTheDocument();
});
test('Teste se existe na página uma seção com os mapas', () => {
  renderWithRouter(<App />);
  const link = screen.getByRole('link', { name: /more details/i });
  userEvent.click(link);
  const locations = screen.getByRole('heading', { name: /game locations/i, level: 2 });
  expect(locations).toBeInTheDocument();
  const locationImg = screen.getAllByAltText('Pikachu location');
  const location1 = screen.getByText(/kanto viridian forest/i);
  const location2 = screen.getByText(/kanto power plant/i);
  expect(locationImg).toHaveLength(2);
  expect(locationImg[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(locationImg[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  expect(location1).toBeInTheDocument();
  expect(location2).toBeInTheDocument();
});
test('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
  renderWithRouter(<App />);
  const link = screen.getByRole('link', { name: /more details/i });
  userEvent.click(link);
  const favButton = screen.getByLabelText('Pokémon favoritado?');
  expect(favButton).toBeInTheDocument();
  userEvent.click(favButton);
  const favStar = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
  expect(favStar).toBeInTheDocument();
});
