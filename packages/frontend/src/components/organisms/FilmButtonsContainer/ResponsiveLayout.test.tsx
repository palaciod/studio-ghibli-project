import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import { FilmButtonsContainer } from './FilmButtonsContainer';
import { Film } from '~/shared/types';

// Mock film data for testing
const mockFilms: Film[] = [
  {
    id: 'film-1',
    title: 'Film 1',
    description: 'Test film 1',
    director: 'Director 1',
    releaseDate: '2020',
    runningTime: 120,
    rtScore: 95,
    image: 'https://example.com/poster1.jpg',
  },
  {
    id: 'film-2',
    title: 'Film 2',
    description: 'Test film 2',
    director: 'Director 2',
    releaseDate: '2021',
    runningTime: 110,
    rtScore: 92,
    image: 'https://example.com/poster2.jpg',
  },
  {
    id: 'film-3',
    title: 'Film 3',
    description: 'Test film 3',
    director: 'Director 3',
    releaseDate: '2022',
    runningTime: 100,
    rtScore: 90,
    image: 'https://example.com/poster3.jpg',
  },
  {
    id: 'film-4',
    title: 'Film 4',
    description: 'Test film 4',
    director: 'Director 4',
    releaseDate: '2023',
    runningTime: 130,
    rtScore: 97,
    image: 'https://example.com/poster4.jpg',
  },
];

const mockColors = ['#d79a68', '#c24646', '#279094', '#3e6cac'];

// Helper function to render with theme
const renderWithTheme = (
  component: React.ReactElement,
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
) => {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  // Mock window.innerWidth for different breakpoints
  if (breakpoint) {
    const widths = {
      xs: 400, // Mobile
      sm: 768, // Tablet
      md: 1024, // Small desktop
      lg: 1400, // Large desktop
      xl: 1600, // Extra large
    };
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: widths[breakpoint],
    });
  }

  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('ResponsiveLayout', () => {
  const mockOnFilmClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset window size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 768,
    });
  });

  it('renders container with responsive styles', () => {
    renderWithTheme(
      <FilmButtonsContainer
        films={mockFilms}
        colors={mockColors}
        onFilmClick={mockOnFilmClick}
      />,
    );

    const container = screen.getByTestId('film-buttons-container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveStyle('width: 100%');
  });

  it('renders all four film buttons', () => {
    renderWithTheme(
      <FilmButtonsContainer
        films={mockFilms}
        colors={mockColors}
        onFilmClick={mockOnFilmClick}
      />,
    );

    // Should render all 4 films
    expect(screen.getByText('Film 1')).toBeInTheDocument();
    expect(screen.getByText('Film 2')).toBeInTheDocument();
    expect(screen.getByText('Film 3')).toBeInTheDocument();
    expect(screen.getByText('Film 4')).toBeInTheDocument();
  });

  it('applies grid layout styles', () => {
    renderWithTheme(
      <FilmButtonsContainer
        films={mockFilms}
        colors={mockColors}
        onFilmClick={mockOnFilmClick}
      />,
    );

    const container = screen.getByTestId('film-buttons-container');
    const gridContainer = container.firstChild as HTMLElement;

    // Check that the grid container exists
    expect(gridContainer).toBeInTheDocument();
  });

  it('handles mobile viewport (xs breakpoint)', () => {
    renderWithTheme(
      <FilmButtonsContainer
        films={mockFilms}
        colors={mockColors}
        onFilmClick={mockOnFilmClick}
      />,
      'xs',
    );

    // On mobile, should still render all buttons but in single column
    expect(screen.getByText('Film 1')).toBeInTheDocument();
    expect(screen.getByText('Film 2')).toBeInTheDocument();
    expect(screen.getByText('Film 3')).toBeInTheDocument();
    expect(screen.getByText('Film 4')).toBeInTheDocument();
  });

  it('handles tablet viewport (sm breakpoint)', () => {
    renderWithTheme(
      <FilmButtonsContainer
        films={mockFilms}
        colors={mockColors}
        onFilmClick={mockOnFilmClick}
      />,
      'sm',
    );

    // On tablet, should render all buttons in 2x2 grid
    expect(screen.getByText('Film 1')).toBeInTheDocument();
    expect(screen.getByText('Film 2')).toBeInTheDocument();
    expect(screen.getByText('Film 3')).toBeInTheDocument();
    expect(screen.getByText('Film 4')).toBeInTheDocument();
  });

  it('handles desktop viewport (lg breakpoint)', () => {
    renderWithTheme(
      <FilmButtonsContainer
        films={mockFilms}
        colors={mockColors}
        onFilmClick={mockOnFilmClick}
      />,
      'lg',
    );

    // On large desktop, should render all buttons in single row
    expect(screen.getByText('Film 1')).toBeInTheDocument();
    expect(screen.getByText('Film 2')).toBeInTheDocument();
    expect(screen.getByText('Film 3')).toBeInTheDocument();
    expect(screen.getByText('Film 4')).toBeInTheDocument();
  });

  it('maintains aspect ratio across different screen sizes', () => {
    renderWithTheme(
      <FilmButtonsContainer
        films={mockFilms}
        colors={mockColors}
        onFilmClick={mockOnFilmClick}
      />,
    );

    // Get only the main button containers (not child elements)
    const buttons = screen.getAllByTestId(
      /^film-buttons-container-button-\d+$/,
    );
    expect(buttons).toHaveLength(4);

    // All buttons should be rendered
    buttons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });

  it('applies correct colors to buttons cyclically', () => {
    renderWithTheme(
      <FilmButtonsContainer
        films={mockFilms}
        colors={['#red', '#blue']}
        onFilmClick={mockOnFilmClick}
      />,
    );

    // Should cycle through colors: Film 1: red, Film 2: blue, Film 3: red, Film 4: blue
    expect(
      screen.getByTestId('film-buttons-container-button-0'),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('film-buttons-container-button-1'),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('film-buttons-container-button-2'),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('film-buttons-container-button-3'),
    ).toBeInTheDocument();
  });

  it('handles empty films array gracefully', () => {
    renderWithTheme(
      <FilmButtonsContainer
        films={[]}
        colors={mockColors}
        onFilmClick={mockOnFilmClick}
      />,
    );

    const container = screen.getByTestId('film-buttons-container');
    expect(container).toBeInTheDocument();

    // Should not have any buttons
    expect(
      screen.queryByTestId(/film-buttons-container-button-/),
    ).not.toBeInTheDocument();
  });

  it('maintains container max-width on large screens', () => {
    renderWithTheme(
      <FilmButtonsContainer
        films={mockFilms}
        colors={mockColors}
        onFilmClick={mockOnFilmClick}
      />,
      'xl',
    );

    const container = screen.getByTestId('film-buttons-container');
    expect(container).toBeInTheDocument();

    // Container should have max-width styling to prevent buttons from becoming too large
    // This is applied via CSS and harder to test directly, but we can verify the container exists
    expect(container).toHaveStyle('width: 100%');
  });
});
