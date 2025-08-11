import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { FilmButtonsContainer } from '~/components/organisms/FilmButtonsContainer/FilmButtonsContainer';
import { MOCK_FILMS } from '~/shared/constants/mocks/filmData';
import { BUTTON_COLORS_ARRAY } from '~/shared/constants/colors';
import { Film } from '~/shared/types';

export interface FilmSelectionPageProps {
  'data-testid'?: string;
}

/**
 * Simulates fetching film data with a delay and occasional failures
 */
const simulateFilmFetch = async (filmId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Simulate network delay (1-3 seconds)
    const delay = Math.random() * 2000 + 1000;

    setTimeout(() => {
      // 70% success rate
      const success = Math.random() > 0.3;

      if (success) {
        resolve();
      } else {
        reject(new Error(`Failed to fetch film data for ${filmId}`));
      }
    }, delay);
  });
};

/**
 * Main page component for film selection interface
 * Integrates FilmButtonsContainer with data fetching logic and overall layout
 */
export const FilmSelectionPage: React.FC<FilmSelectionPageProps> = ({
  'data-testid': dataTestId = 'film-selection-page',
}) => {
  const handleFilmClick = async (film: Film): Promise<void> => {
    try {
      await simulateFilmFetch(film.id);
      console.log(`Successfully selected film: ${film.title}`);
    } catch (err) {
      console.error(`Failed to select film: ${film.title}`, err);
      throw err; // Re-throw so FilmButtonsContainer can handle retry logic
    }
  };

  const pageStyles = {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    py: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const headerStyles = {
    textAlign: 'center',
    mb: 4,
    color: '#333',
    fontWeight: 600,
  };

  const containerStyles = {
    maxWidth: 'lg',
    width: '100%',
    px: { xs: 2, sm: 3, md: 4 },
  };

  return (
    <Box sx={pageStyles} data-testid={dataTestId}>
      <Container sx={containerStyles}>
        <Typography
          variant="h3"
          component="h1"
          sx={headerStyles}
          data-testid={`${dataTestId}-title`}
        >
          Studio Ghibli Film Selection
        </Typography>

        <Typography
          variant="body1"
          sx={{ textAlign: 'center', mb: 4, color: '#666' }}
          data-testid={`${dataTestId}-subtitle`}
        >
          Choose your favorite Studio Ghibli film from the collection below
        </Typography>

        <FilmButtonsContainer
          films={MOCK_FILMS}
          colors={[...BUTTON_COLORS_ARRAY]}
          onFilmClick={handleFilmClick}
          data-testid={`${dataTestId}-buttons-container`}
        />
      </Container>
    </Box>
  );
};

export default FilmSelectionPage;
