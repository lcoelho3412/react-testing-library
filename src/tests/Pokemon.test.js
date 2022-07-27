import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

describe('Testa o componente Pokemon', () => {
  it('6.1 Testa se é renderizado um card com as informações do pokémon', () => {
    renderWithRouter(<App />);
    const nameOnCard = screen.getByTestId('pokemon-name');
    expect(nameOnCard.innerHTML).toBe('Pikachu');

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe('Electric');

    const pokemonWeigth = screen.getByTestId('pokemon-weight');
    expect(pokemonWeigth.innerHTML).toBe('Average weight: 6.0 kg');

    const imageOnCard = screen.getByRole('img');
    const pikachURL = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(imageOnCard.src).toBe(pikachURL);

    const nextButton = screen.getByTestId('next-pokemon');

    expect(imageOnCard.alt).toBe('Pikachu sprite');
    userEvent.click(nextButton);

    const nextNameOnCard = screen.getByTestId('pokemon-name');
    expect(nextNameOnCard.innerHTML).toBe('Charmander');

    const nextPokemonType = screen.getByTestId('pokemon-type');
    expect(nextPokemonType.innerHTML).toBe('Fire');

    const nextPokemonWeigth = screen.getByTestId('pokemon-weight');
    expect(nextPokemonWeigth.innerHTML).toBe('Average weight: 8.5 kg');

    const nextImage = screen.getByRole('img');
    const charmanderURL = 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png';
    expect(nextImage.src).toBe(charmanderURL);
    expect(nextImage.alt).toBe('Charmander sprite');
  });

  it('6.2 Testa se o card indicado na Pokédex contém um link de navegação para detalhes',
    () => {
      const { history } = renderWithRouter(<App />);

      const detailsLink = screen.getByText(/more details/i);
      expect(detailsLink).toBeInTheDocument();

      userEvent.click(detailsLink);

      const { location: { pathname } } = history;
      expect(pathname).not.toBe('/');
      expect(pathname).toContain('/pokemon');
    });

  it('6.3 Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByText(/more details/i);
    expect(detailsLink).toBeInTheDocument();

    userEvent.click(detailsLink);

    const favoritePokemon = screen.getByText(/pokémon favoritado/i);
    userEvent.click(favoritePokemon);

    const StarImages = screen.getAllByRole('img');
    const star = StarImages.find(({ src }) => src === 'http://localhost/star-icon.svg');

    expect(star).toBeInTheDocument();
    expect(star.alt).toBe('Pikachu is marked as favorite');
  });
});
