import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';
import { FilmButtonsContainer } from '~/components/organisms/FilmButtonsContainer/FilmButtonsContainer';
import { useAllFilms, useFilmsByIds } from '~/graphql/hooks';
import { BUTTON_COLORS_ARRAY } from '~/shared/constants/colors';
import { DEFAULT_FILM_IDS } from '~/shared/constants/films';
import { Film } from '~/shared/types';

export interface FilmSelectionPageProps {
  'data-testid'?: string;
}

/**
 * Handles film selection with real GraphQL data
 */
const handleFilmClick = async (film: Film): Promise<void> => {
  try {
    // For now, just log the selection - replace with actual selection logic
    console.log(`Successfully selected film: ${film.title}`);
  } catch (err) {
    console.error(`Failed to select film: ${film.title}`, err);
    throw err; // Re-throw so FilmButtonsContainer can handle retry logic
  }
};

/**
 * Main page component for film selection interface
 * Integrates FilmButtonsContainer with GraphQL data fetching and overall layout
 */
export const FilmSelectionPage: React.FC<FilmSelectionPageProps> = ({
  'data-testid': dataTestId = 'film-selection-page',
}) => {
  // State to track whether to show all films or just the default 4
  const [showAllFilms, setShowAllFilms] = useState(false);

  // Conditionally fetch either default films or all films
  const defaultFilmsQuery = useFilmsByIds([...DEFAULT_FILM_IDS]);
  const allFilmsQuery = useAllFilms();

  // Use the appropriate query based on state
  const currentQuery = showAllFilms ? allFilmsQuery : defaultFilmsQuery;
  const { loading, error, refetch } = currentQuery;

  // Extract films from the query result with proper typing
  const films = showAllFilms
    ? allFilmsQuery.data?.allFilms
    : defaultFilmsQuery.data?.films;

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

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress size={60} />
            <Typography sx={{ ml: 2, alignSelf: 'center' }}>
              Loading Studio Ghibli films...
            </Typography>
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 4 }}
            action={<button onClick={() => refetch()}>Retry</button>}
          >
            Failed to load films: {error.message}
          </Alert>
        )}

        {/* Toggle Button */}
        {!loading && !error && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Button
              variant={showAllFilms ? 'outlined' : 'contained'}
              onClick={() => setShowAllFilms(!showAllFilms)}
              size="large"
              sx={{
                minWidth: 200,
                fontSize: '1.1rem',
                py: 1.5,
              }}
              data-testid={`${dataTestId}-toggle-button`}
            >
              {showAllFilms ? 'Show Default Films' : 'Show All Films'}
            </Button>
          </Box>
        )}

        {/* Films Display */}
        {films && films.length > 0 && (
          <>
            <Typography
              variant="h6"
              sx={{ textAlign: 'center', mb: 2, color: '#555' }}
              data-testid={`${dataTestId}-films-count`}
            >
              {showAllFilms
                ? `Showing all ${films.length} Studio Ghibli films`
                : `Showing ${films.length} featured films`}
            </Typography>
            <FilmButtonsContainer
              films={films.map((film: any) => ({
                id: film.id,
                title: film.title,
                description: film.description,
                director: film.director,
                releaseDate: film.releaseDate,
                runningTime: film.runningTime,
                rtScore: film.rtScore,
                image: film.image || undefined,
                movieBanner: film.movieBanner || undefined,
              }))}
              colors={[...BUTTON_COLORS_ARRAY]}
              onFilmClick={handleFilmClick}
              data-testid={`${dataTestId}-buttons-container`}
            />
          </>
        )}

        {/* No Films State */}
        {!loading && !error && films && films.length === 0 && (
          <Typography sx={{ textAlign: 'center', color: '#666' }}>
            No films available at the moment.
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default FilmSelectionPage;
