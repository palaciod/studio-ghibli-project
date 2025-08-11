import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { FilmButtonCard } from './FilmButtonCard';
import { ButtonState } from '~/shared/types';

// Mock the LoadingSpinner component
vi.mock('~/components/atoms', () => ({
  LoadingSpinner: ({
    'data-testid': dataTestId,
  }: {
    'data-testid': string;
  }) => <div data-testid={dataTestId}>Loading...</div>,
}));

const mockProps = {
  title: 'Test Film',
  color: '#ff0000',
  state: ButtonState.DEFAULT,
  onClick: vi.fn(),
};

describe('FilmButtonCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<FilmButtonCard {...mockProps} />);

    const card = screen.getByTestId('film-button-card');
    const title = screen.getByTestId('film-button-card-title');

    expect(card).toBeInTheDocument();
    expect(title).toHaveTextContent('Test Film');
  });

  it('calls onClick when clicked and not disabled', () => {
    render(<FilmButtonCard {...mockProps} />);

    const card = screen.getByTestId('film-button-card');
    fireEvent.click(card);

    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    render(<FilmButtonCard {...mockProps} disabled={true} />);

    const card = screen.getByTestId('film-button-card');
    fireEvent.click(card);

    expect(mockProps.onClick).not.toHaveBeenCalled();
  });

  it('shows loading spinner when state is LOADING', () => {
    render(<FilmButtonCard {...mockProps} state={ButtonState.LOADING} />);

    const spinner = screen.getByTestId('film-button-card-loading');
    const title = screen.queryByTestId('film-button-card-title');

    expect(spinner).toBeInTheDocument();
    expect(title).not.toBeInTheDocument();
  });

  it('does not call onClick when in loading state', () => {
    render(<FilmButtonCard {...mockProps} state={ButtonState.LOADING} />);

    const card = screen.getByTestId('film-button-card');
    fireEvent.click(card);

    expect(mockProps.onClick).not.toHaveBeenCalled();
  });

  it('displays poster image when state is SUCCESS and posterUrl is provided', () => {
    const posterUrl = 'https://example.com/poster.jpg';
    render(
      <FilmButtonCard
        {...mockProps}
        state={ButtonState.SUCCESS}
        posterUrl={posterUrl}
      />,
    );

    const card = screen.getByTestId('film-button-card');
    expect(card).toHaveStyle(`background-image: url(${posterUrl})`);
  });

  it('applies custom className', () => {
    const customClass = 'custom-film-card';
    render(<FilmButtonCard {...mockProps} className={customClass} />);

    const card = screen.getByTestId('film-button-card');
    expect(card).toHaveClass(customClass);
  });

  it('uses custom data-testid when provided', () => {
    const customTestId = 'custom-card';
    render(<FilmButtonCard {...mockProps} data-testid={customTestId} />);

    const card = screen.getByTestId(customTestId);
    const title = screen.getByTestId(`${customTestId}-title`);

    expect(card).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  it('applies background color when not in success state', () => {
    render(<FilmButtonCard {...mockProps} />);

    const card = screen.getByTestId('film-button-card');
    expect(card).toHaveStyle('background-color: #ff0000');
  });

  it('applies blur filter when in loading state', () => {
    render(<FilmButtonCard {...mockProps} state={ButtonState.LOADING} />);

    const card = screen.getByTestId('film-button-card');
    expect(card).toHaveStyle('filter: blur(2px)');
  });
});
