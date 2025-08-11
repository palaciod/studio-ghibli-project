import React, { useState } from 'react';
import { Box, Alert, Snackbar } from '@mui/material';
import { Film, ButtonState } from '~/shared/types';
import { FilmButtonCard } from '~/components/molecules/FilmButtonCard/FilmButtonCard';
import {
  containerStyles,
  buttonGridStyles,
} from './FilmButtonsContainer.styles.ts';

export interface FilmButtonsContainerProps {
  films: Film[];
  colors: string[];
  onFilmClick?: (film: Film) => Promise<void>;
  className?: string;
  'data-testid'?: string;
}

interface FilmButtonState {
  [filmId: string]: ButtonState;
}

export const FilmButtonsContainer: React.FC<FilmButtonsContainerProps> = ({
  films,
  colors,
  onFilmClick,
  className,
  'data-testid': dataTestId = 'film-buttons-container',
}) => {
  const [buttonStates, setButtonStates] = useState<FilmButtonState>({});
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<{ [filmId: string]: number }>(
    {},
  );

  const handleFilmClick = async (film: Film, colorIndex: number) => {
    if (!onFilmClick) return;

    const filmId = film.id;
    const currentRetries = retryCount[filmId] || 0;

    // Set loading state
    setButtonStates((prev) => ({
      ...prev,
      [filmId]: ButtonState.LOADING,
    }));

    try {
      await onFilmClick(film);

      // Success - set success state and reset retry count
      setButtonStates((prev) => ({
        ...prev,
        [filmId]: ButtonState.SUCCESS,
      }));
      setRetryCount((prev) => ({
        ...prev,
        [filmId]: 0,
      }));
      setError(null);
    } catch (err) {
      const newRetryCount = currentRetries + 1;
      const maxRetries = 3;

      if (newRetryCount < maxRetries) {
        // Retry with exponential backoff
        setRetryCount((prev) => ({
          ...prev,
          [filmId]: newRetryCount,
        }));

        // Calculate backoff delay (1s, 2s, 4s)
        const backoffDelay = Math.pow(2, currentRetries) * 1000;

        setTimeout(() => {
          handleFilmClick(film, colorIndex);
        }, backoffDelay);
      } else {
        // Max retries reached - set disabled state and show error
        setButtonStates((prev) => ({
          ...prev,
          [filmId]: ButtonState.DISABLED,
        }));
        setError(
          `Failed to load ${film.title} after ${maxRetries} attempts. Please try again later.`,
        );
        setRetryCount((prev) => ({
          ...prev,
          [filmId]: 0,
        }));
      }
    }
  };

  const getButtonState = (filmId: string): ButtonState => {
    return buttonStates[filmId] || ButtonState.DEFAULT;
  };

  const getFilmColor = (index: number): string => {
    return colors[index % colors.length];
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <Box sx={containerStyles} className={className} data-testid={dataTestId}>
      <Box sx={buttonGridStyles}>
        {films.map((film, index) => {
          const color = getFilmColor(index);
          const state = getButtonState(film.id);
          const isDisabled = state === ButtonState.DISABLED;

          return (
            <FilmButtonCard
              key={film.id}
              title={film.title}
              color={color}
              posterUrl={film.image}
              state={state}
              disabled={isDisabled}
              onClick={() => handleFilmClick(film, index)}
              data-testid={`${dataTestId}-button-${index}`}
              film={film}
              enableFlipping={true}
            />
          );
        })}
      </Box>

      {/* Error notification */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        data-testid={`${dataTestId}-error-snackbar`}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FilmButtonsContainer;
