import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../pages';

import renderWithRouter from './RenderWithRouter';

describe('Testes do componente About.js.',
  () => {
    it('Testa se a página About contem um Heading', () => {
      renderWithRouter(<About />);
      const expectedHeading = 'About Pokédex';

      const title = screen.getByText(expectedHeading);

      expect(title).toBeInTheDocument();
    });

    it('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
      renderWithRouter(<About />);
      const firstParagraph = screen
        .getByText(
          /This application simulates a Pokédex/i,
        );
      const secondParagraph = screen
        .getByText(
          /One can filter Pokémons by type, and see more details for each one of them/i,
        );
      expect(firstParagraph).toBeInTheDocument();
      expect(secondParagraph).toBeInTheDocument();
    });

    it('Testa se a página contém a imagem de uma Pokédex com url específica', () => {
      renderWithRouter(<About />);
      const image = screen.getByAltText(/Pokédex/i);

      const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

      expect(image).toHaveAttribute('src', url);
    });
  });
