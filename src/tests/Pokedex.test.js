import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

describe('5. Testa o componente <Pokedex.js />', () => {
  it('5.1 Testa se a página contém um heading h2 com o texto Encountered pokémons',
    () => {
      renderWithRouter(<App />);

      const subtitle = screen.getByRole(
        'heading', { name: /Encountered pokémons/i, level: 2 },
      );

      expect(subtitle).toBeInTheDocument();
    });

  it('5.2 Testa a exibição do próximo pokémon quando o botão é clicado', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByText(/all/i);
    expect(allButton).toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(nextButton);

    const charmander = screen.getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();
  });

  it('5.3 Testa se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);

    const numberOfPokemonTypesButtons = 7;
    const numberOfRenderedPokemons = 1;

    const image = screen.getAllByAltText(/sprite/i);
    const pokemonTypeButton = screen.getAllByTestId('pokemon-type-button');

    expect(pokemonTypeButton.length).toBe(numberOfPokemonTypesButtons);
    expect(image.length).toBe(numberOfRenderedPokemons);
  });

  it('5.4 Teste se a Pokédex tem os botões de filtro:', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button',
      { name: 'All' });
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);

    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();

    const electric = screen.getByRole('button', { name: /Electric/i });
    expect(electric).toBeInTheDocument();
    userEvent.click(electric);

    expect(allButton).toBeInTheDocument();
    expect(pikachu).toBeInTheDocument();
  });

  it('5.5 Teste se a Pokédex contém um botão para resetar o filtro:', () => {
    renderWithRouter(<App />);
    const reset = screen.getByRole('button', { name: /all/i });
    const fire = screen.getByRole('button', { name: /fire/i });
    userEvent.click(fire);
    const type = screen.getByTestId('pokemon-type');
    expect(type.innerHTML).toBe('Fire');
    userEvent.click(reset);
    const bug = screen.getByRole('button', { name: /bug/i });
    userEvent.click(bug);
    const newType = screen.getByTestId('pokemon-type');
    expect(newType.innerHTML).toBe('Bug');
  });
});
