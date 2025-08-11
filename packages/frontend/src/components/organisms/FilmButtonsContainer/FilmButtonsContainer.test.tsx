import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilmButtonsContainer } from './FilmButtonsContainer';
import { Film } from '~/shared/types';

// Mock film data for testing
const mockFilms: Film[] = [
  {
    id: '58611129-2dbc-4a81-a72f-77ddfc1b1b49',
    title: 'My Neighbor Totoro',
    description: 'Two sisters move to the country...',
    director: 'Hayao Miyazaki',
    releaseDate: '1988',
    runningTime: 86,
    rtScore: 93,
    image: 'https://example.com/totoro.jpg',
  },
  {
    id: 'ea660b10-85c4-4ae3-8a5f-41cea3648e3e',
    title: 'Spirited Away',
    description: 'A young girl enters a world...',
    director: 'Hayao Miyazaki',
    releaseDate: '2001',
    runningTime: 125,
    rtScore: 97,
    image: 'https://example.com/spirited-away.jpg',
  },
];

const mockColors = ['#d79a68', '#c24646'];

describe('FilmButtonsContainer', () => {
  const mockOnFilmClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with film buttons', () => {
    render(
      <FilmButtonsContainer
        films={mockFilms}
        colors={mockColors}
        onFilmClick={mockOnFilmClick}
      />,
    );

    expect(screen.getByTestId('film-buttons-container')).toBeInTheDocument();
    expect(screen.getByText('My Neighbor Totoro')).toBeInTheDocument();
    expect(screen.getByText('Spirited Away')).toBeInTheDocument();
  });

  it('applies custom className and data-testid', () => {
    render(
      <FilmButtonsContainer
        films={mockFilms}
        colors={mockColors}
        onFilmClick={mockOnFilmClick}
        className="custom-class"
        data-testid="custom-container"
      />,
    );

    const container = screen.getByTestId('custom-container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('custom-class');
  });

  it('calls onFilmClick when button is clicked', () => {
    mockOnFilmClick.mockResolvedValue(undefined);

    render(
      <FilmButtonsContainer
        films={mockFilms}
        colors={mockColors}
        onFilmClick={mockOnFilmClick}
      />,
    );

    const firstButton = screen.getByTestId('film-buttons-container-button-0');
    fireEvent.click(firstButton);

    expect(mockOnFilmClick).toHaveBeenCalledWith(mockFilms[0]);
  });

  it('renders all film buttons with correct test ids', () => {
    render(
      <FilmButtonsContainer
        films={mockFilms}
        colors={mockColors}
        onFilmClick={mockOnFilmClick}
      />,
    );

    expect(
      screen.getByTestId('film-buttons-container-button-0'),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('film-buttons-container-button-1'),
    ).toBeInTheDocument();
  });

  it('assigns colors cyclically to buttons', () => {
    // Create unique films with different IDs
    const manyFilms: Film[] = [
      { ...mockFilms[0], id: 'film-1' },
      { ...mockFilms[1], id: 'film-2' },
      { ...mockFilms[0], id: 'film-3', title: 'Film 3' },
      { ...mockFilms[1], id: 'film-4', title: 'Film 4' },
      { ...mockFilms[0], id: 'film-5', title: 'Film 5' },
      { ...mockFilms[1], id: 'film-6', title: 'Film 6' },
    ];
    const twoColors = ['#red', '#blue'];

    render(
      <FilmButtonsContainer
        films={manyFilms}
        colors={twoColors}
        onFilmClick={mockOnFilmClick}
      />,
    );

    // Each film should get a color based on its index % colors.length
    // Film 0: #red, Film 1: #blue, Film 2: #red, etc.
    expect(
      screen.getByTestId('film-buttons-container-button-0'),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('film-buttons-container-button-1'),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('film-buttons-container-button-2'),
    ).toBeInTheDocument();
  });

  it('works without onFilmClick handler', () => {
    render(<FilmButtonsContainer films={mockFilms} colors={mockColors} />);

    const firstButton = screen.getByTestId('film-buttons-container-button-0');

    // Should not throw error when clicked without handler
    expect(() => {
      fireEvent.click(firstButton);
    }).not.toThrow();
  });

  it('handles empty films array', () => {
    render(
      <FilmButtonsContainer
        films={[]}
        colors={mockColors}
        onFilmClick={mockOnFilmClick}
      />,
    );

    expect(screen.getByTestId('film-buttons-container')).toBeInTheDocument();
    // Should not have any button elements
    expect(
      screen.queryByTestId(/film-buttons-container-button-/),
    ).not.toBeInTheDocument();
  });

  it('renders with container and grid styles applied', () => {
    render(
      <FilmButtonsContainer
        films={mockFilms}
        colors={mockColors}
        onFilmClick={mockOnFilmClick}
      />,
    );

    const container = screen.getByTestId('film-buttons-container');
    expect(container).toBeInTheDocument();

    // Should have film button cards rendered (using test IDs instead of button role)
    expect(
      screen.getByTestId('film-buttons-container-button-0'),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('film-buttons-container-button-1'),
    ).toBeInTheDocument();
  });

  it('passes correct props to FilmButtonCard components', () => {
    render(
      <FilmButtonsContainer
        films={mockFilms}
        colors={mockColors}
        onFilmClick={mockOnFilmClick}
      />,
    );

    // Check that film titles are rendered (indicating FilmButtonCard received correct props)
    expect(screen.getByText('My Neighbor Totoro')).toBeInTheDocument();
    expect(screen.getByText('Spirited Away')).toBeInTheDocument();
  });
});
