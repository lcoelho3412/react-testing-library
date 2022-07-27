import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from './RenderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  it('1. A página contém um heading h2 com o texto \'Page requested not found\':',
    () => {
      renderWithRouter(<NotFound />);
      expect(screen.getByRole('heading', {
        name: /Page requested not found/i,
        level: 2,
      })).toBeInTheDocument();
    });

  it('2. A página mostra uma imagem',
    () => {
      renderWithRouter(<NotFound />);
      const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
      const image = screen
        .getByAltText(/Pikachu crying because the page requested was not found/i);

      expect(image).toHaveAttribute('src', src);
    });
});
