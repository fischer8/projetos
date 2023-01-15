import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

test('Teste se a página tem um heading h2 com o texto Page requested not found', () => {
  renderWithRouter(<NotFound />);
  const heading = screen.getByRole(
    'heading',
    { name: /page requested not found/i, level: 2 },
  );
  expect(heading).toBeInTheDocument();
});
test('Teste se a página mostra a imagem', () => {
  renderWithRouter(<NotFound />);
  const image = screen.getByRole('img', { name: /pikachu crying/i });
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
