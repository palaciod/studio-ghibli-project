import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ThemeProvider } from '@mui/material';
import { theme } from '~/shared/styles/theme';

// Mock the GraphQL hooks
vi.mock('~/graphql/hooks', () => ({
  useAllFilms: vi.fn(),
  useFilmsByIds: vi.fn(),
  useFilmById: vi.fn(),
  useFilmsExcept: vi.fn(),
}));

// Mock the FilmButtonsContainer
vi.mock(
  '~/components/organisms/FilmButtonsContainer/FilmButtonsContainer',
  () => ({
    FilmButtonsContainer: vi.fn(),
  }),
);

// Import after mocking
import { FilmSelectionPage } from './FilmSelectionPage';
import { FilmButtonsContainer } from '~/components/organisms/FilmButtonsContainer/FilmButtonsContainer';
import { useAllFilms, useFilmsByIds } from '~/graphql/hooks';

// Get mocked functions
const mockFilmButtonsContainer = vi.mocked(FilmButtonsContainer);
const mockUseAllFilms = vi.mocked(useAllFilms);
const mockUseFilmsByIds = vi.mocked(useFilmsByIds);

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('FilmSelectionPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock default films data for useFilmsByIds
    const mockDefaultFilms = [
      {
        id: 'ebbb6b7c-945c-41ee-a792-de0e43191bd8',
        title: 'Porco Rosso',
        description:
          'A World War I pilot is cursed to look like an anthropomorphic pig.',
        director: 'Hayao Miyazaki',
        releaseDate: '1992',
        runningTime: 94,
        rtScore: 94,
      },
      {
        id: 'ea660b10-85c4-4ae3-8a5f-41cea3648e3e',
        title: "Kiki's Delivery Service",
        description:
          'A young witch loses her magical powers and must rediscover them.',
        director: 'Hayao Miyazaki',
        releaseDate: '1989',
        runningTime: 102,
        rtScore: 96,
      },
    ];

    // Mock useFilmsByIds hook (used for default films)
    mockUseFilmsByIds.mockReturnValue({
      data: { films: mockDefaultFilms },
      loading: false,
      error: null,
      refetch: vi.fn(),
    } as any);

    // Mock the useAllFilms hook
    mockUseAllFilms.mockReturnValue({
      data: { allFilms: mockDefaultFilms },
      loading: false,
      error: null,
      refetch: vi.fn(),
    } as any);

    // Set up default mock implementation
    mockFilmButtonsContainer.mockImplementation(
      ({ onFilmClick, 'data-testid': dataTestId }) =>
        React.createElement(
          'div',
          { 'data-testid': dataTestId },
          React.createElement(
            'button',
            {
              onClick: () =>
                onFilmClick?.({
                  id: 'test-film',
                  title: 'Test Film',
                  description: 'A test film',
                  director: 'Test Director',
                  releaseDate: '2023',
                  runningTime: 120,
                  rtScore: 95,
                }),
              'data-testid': 'mock-film-button',
            },
            'Mock Film Button',
          ),
        ),
    );
  });

  it('should render page title and subtitle', () => {
    renderWithTheme(<FilmSelectionPage />);

    expect(
      screen.getByText('Studio Ghibli Film Selection'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Choose your favorite Studio Ghibli film from the collection below',
      ),
    ).toBeInTheDocument();
  });

  it('should render with custom data-testid', () => {
    renderWithTheme(<FilmSelectionPage data-testid="custom-page" />);

    expect(screen.getByTestId('custom-page')).toBeInTheDocument();
    expect(screen.getByTestId('custom-page-title')).toBeInTheDocument();
    expect(screen.getByTestId('custom-page-subtitle')).toBeInTheDocument();
    expect(
      screen.getByTestId('custom-page-buttons-container'),
    ).toBeInTheDocument();
  });

  it('should pass correct props to FilmButtonsContainer', () => {
    renderWithTheme(<FilmSelectionPage />);

    expect(mockFilmButtonsContainer).toHaveBeenCalledWith(
      expect.objectContaining({
        films: expect.any(Array),
        colors: expect.any(Array),
        onFilmClick: expect.any(Function),
        'data-testid': 'film-selection-page-buttons-container',
      }),
      expect.any(Object),
    );
  });

  it('should handle film click without errors', () => {
    renderWithTheme(<FilmSelectionPage />);

    const filmButton = screen.getByTestId('mock-film-button');

    // Should not throw an error when clicked
    expect(() => {
      fireEvent.click(filmButton);
    }).not.toThrow();
  });

  it('should have proper page layout and styling', () => {
    renderWithTheme(<FilmSelectionPage />);

    const pageContainer = screen.getByTestId('film-selection-page');
    expect(pageContainer).toBeInTheDocument();

    // Check that the page has proper structure
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Studio Ghibli Film Selection',
    );
  });

  it('should pass MOCK_FILMS data to FilmButtonsContainer', () => {
    renderWithTheme(<FilmSelectionPage />);

    const call = mockFilmButtonsContainer.mock.calls[0];
    expect(call[0].films).toBeDefined();
    expect(Array.isArray(call[0].films)).toBe(true);
    expect(call[0].films.length).toBeGreaterThan(0);
  });

  it('should pass BUTTON_COLORS_ARRAY to FilmButtonsContainer', () => {
    renderWithTheme(<FilmSelectionPage />);

    const call = mockFilmButtonsContainer.mock.calls[0];
    expect(call[0].colors).toBeDefined();
    expect(Array.isArray(call[0].colors)).toBe(true);
    expect(call[0].colors.length).toBeGreaterThan(0);
  });

  it('should handle multiple film clicks independently', () => {
    renderWithTheme(<FilmSelectionPage />);

    const filmButton = screen.getByTestId('mock-film-button');

    // Should be able to handle multiple clicks without errors
    expect(() => {
      fireEvent.click(filmButton);
      fireEvent.click(filmButton);
      fireEvent.click(filmButton);
    }).not.toThrow();
  });
});
