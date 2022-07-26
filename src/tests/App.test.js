import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

describe('Testa se o topo da aplicação contém um conjunto fixo de links de navegação',
  () => {
    it('1. Testa se a aplicação possui os texto Home', () => {
      renderWithRouter(<App />);

      const homeLink = screen.getByRole('link', { name: /home/i });

      expect(homeLink).toBeInTheDocument();
    });

    it('2. Testa se a aplicação possui os texto About', () => {
      renderWithRouter(<App />);

      const aboutLink = screen.getByRole('link', { name: /about/i });

      expect(aboutLink).toBeInTheDocument();
    });

    it('3. Testa se a aplicação possui os texto Favorite', () => {
      renderWithRouter(<App />);

      const favoriteLink = screen.getByRole('link', { name: /favorite/i });

      expect(favoriteLink).toBeInTheDocument();
    });

    it('1.1 Teste se a aplicação é redirecionada para a página inicial',
      () => {
        const { history } = renderWithRouter(<App />);
        const homeLink = screen.getByRole('link', { name: /home/i });

        userEvent.click(homeLink);
        const { pathname } = history.location;

        expect(pathname).toBe('/');
      });

    it('2.1 Teste se a aplicação é redirecionada para a página About',
      () => {
        const { history } = renderWithRouter(<App />);
        const aboutLink = screen.getByRole('link', { name: /about/i });

        userEvent.click(aboutLink);
        const { pathname } = history.location;

        expect(pathname).toBe('/about');
      });
    it('3.1 Teste se a aplicação é redirecionada para a página de favoritos',
      () => {
        const { history } = renderWithRouter(<App />);
        const favoriteLink = screen.getByRole('link', { name: /favorite/i });

        userEvent.click(favoriteLink);
        const { pathname } = history.location;

        expect(pathname).toBe('/favorites');
      });

    it('4. Teste se a aplicação é redirecionada para a página 404 quando link é inválido',
      () => {
        const { history } = renderWithRouter(<App />);

        history.push('/whatever');
        const notFoundLink = screen.getByRole('heading', {
          name: /Page requested not found/i,
          level: 2,
        });

        expect(notFoundLink).toBeInTheDocument();
      });
  });
