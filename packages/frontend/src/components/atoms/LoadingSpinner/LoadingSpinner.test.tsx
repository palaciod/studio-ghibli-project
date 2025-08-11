import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoadingSpinner } from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByTestId('loading-spinner');
    const container = screen.getByTestId('loading-spinner-container');

    expect(spinner).toBeInTheDocument();
    expect(container).toBeInTheDocument();
  });

  it('applies custom size prop', () => {
    render(<LoadingSpinner size={60} />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveStyle('width: 60px');
    expect(spinner).toHaveStyle('height: 60px');
  });

  it('applies custom color prop', () => {
    render(<LoadingSpinner color="secondary" />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveClass('MuiCircularProgress-colorSecondary');
  });

  it('applies custom className to container', () => {
    const customClass = 'custom-loading-class';
    render(<LoadingSpinner className={customClass} />);

    const container = screen.getByTestId('loading-spinner-container');
    expect(container).toHaveClass(customClass);
  });

  it('uses custom data-testid when provided', () => {
    const customTestId = 'custom-spinner';
    render(<LoadingSpinner data-testid={customTestId} />);

    const spinner = screen.getByTestId(customTestId);
    const container = screen.getByTestId(`${customTestId}-container`);

    expect(spinner).toBeInTheDocument();
    expect(container).toBeInTheDocument();
  });

  it('applies custom thickness prop', () => {
    render(<LoadingSpinner thickness={5} />);

    const spinner = screen.getByTestId('loading-spinner');
    // CircularProgress thickness affects stroke-width in SVG
    expect(spinner.querySelector('circle')).toHaveAttribute(
      'stroke-width',
      '5',
    );
  });

  it('has proper accessibility attributes', () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveAttribute('role', 'progressbar');
  });
});
