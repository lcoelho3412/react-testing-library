import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import { FavoritePokemons } from '../pages';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it(
    'Testa se é exibida na tela a mensagem No favorite pokemon found',
    () => {
      renderWithRouter(<App />);

      const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });

      userEvent.click(favoriteLink);

      const defaultFavoriteText = screen.getByText('No favorite pokemon found');
      expect(defaultFavoriteText).toBeInTheDocument();
    },
  );

  it(
    'Testa se é exibido o card do Pikachu quando favoritado.',
    () => {
      renderWithRouter(<App />);

      const details = screen.getByRole('link', { name: /more details/i });

      userEvent.click(details);
      const favoritePokemonChecckbox = screen
        .getByRole('checkbox', { name: /pokémon favoritado/i });

      userEvent.click(favoritePokemonChecckbox);

      const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
      userEvent.click(favoriteLink);

      const pokemon = screen.getByText(/pikachu/i);

      expect(pokemon).toBeInTheDocument();
    },
  );
});
