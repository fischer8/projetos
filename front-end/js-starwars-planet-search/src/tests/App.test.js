import React from 'react';
import {screen, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithProvider from './helpers/renderWithProvider';
import App from '../App';
import MockData from './helpers/MockData';


describe('Testes App', () => {
  afterEach(() => jest.clearAllMocks());
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json:() => Promise.resolve(MockData)
    }))
  })

  it('Testa se o fetch funciona', async () => {
    await act(async () => {
      RenderWithProvider(<App />)
    })
    expect(fetch).toBeCalledWith('https://swapi.dev/api/planets');
    expect(fetch).toBeCalledTimes(1);

    const planetName = screen.getAllByTestId('planet-name')
    expect(planetName.length).toBe(10);
  });

  it('Testes componente SearchBar', async () => {
    await act(async () => {
      RenderWithProvider(<App />)
    })

    const searchBar = screen.getByRole('textbox');
    userEvent.type(searchBar, 'o');
    const filtered = screen.getAllByTestId('planet-name')
    expect(filtered.length).toBe(7);

    const filterButton = screen.getByRole('button', {  name: /filtrar/i});
    userEvent.click(filterButton)

    userEvent.type(searchBar, 'o');
    const filtered2 = screen.getAllByTestId('planet-name')
    expect(filtered2.length).toBe(2);
  });

  it('Testes componente Filter', async () => {
    await act(async () => {
      RenderWithProvider(<App />)
    })
    const filterButton = screen.getByRole('button', {  name: /filtrar/i});
    const comparison = screen.getByTestId('comparison-filter');

    userEvent.selectOptions(comparison, ["menor que"]);
    userEvent.click(filterButton);

    userEvent.selectOptions(comparison, ["maior que"]);
    userEvent.click(filterButton);

    userEvent.selectOptions(comparison, ["igual a"]);
    userEvent.click(filterButton);
  })

  it('Testes componente Sort', async () => {
    await act(async () => {
      RenderWithProvider(<App />)
    })
    const ordButton = screen.getByTestId('column-sort-button');
    const ascButton = screen.getByTestId('column-sort-input-asc');
    const descButton = screen.getByTestId('column-sort-input-desc');

    userEvent.click(ascButton);
    userEvent.click(ordButton);

    const planets = screen.getAllByTestId('planet-name');

    expect(planets[0]).toHaveTextContent('Yavin IV');

    userEvent.click(descButton);
    userEvent.click(ordButton);

    const planets2 = screen.getAllByTestId('planet-name');

    expect(planets2[0]).toHaveTextContent('Coruscant');
  })

  it('Testes componente Options', async () => {
    await act( async () => {
      RenderWithProvider(<App />)
    })

    const filterButton = screen.getByRole('button', {  name: /filtrar/i});
    const column = screen.getByTestId('column-filter');
    const valueInput = screen.getByTestId('value-filter');
    const comparison = screen.getByTestId('comparison-filter');

    userEvent.type(valueInput, '23');
    userEvent.click(filterButton);

    const planets = screen.getAllByTestId('planet-name');
    expect(planets.length).toBe(8);

    userEvent.selectOptions(column, ["surface_water"]);
    userEvent.selectOptions(comparison, ["menor que"]);
    userEvent.click(filterButton);

    const planets2 = screen.getAllByTestId('planet-name');
    expect(planets2.length).toBe(5);

    const optionsButtons = screen.getAllByRole('button', { name: /x/i });
    userEvent.click(optionsButtons[0]);

    const planets3 = screen.getAllByTestId('planet-name');
    expect(planets3.length).toBe(6);

    const optionsButtons2 = screen.getByRole('button', { name: /x/i });

    userEvent.click(optionsButtons2);
    userEvent.clear(valueInput);

    userEvent.selectOptions(column, ["surface_water"]);
    userEvent.selectOptions(comparison, ["igual a"]);

    userEvent.type(valueInput, '0');
    userEvent.click(filterButton);

    const planets4 = screen.getAllByTestId('planet-name');
    expect(planets4.length).toBe(1);
  })
})
