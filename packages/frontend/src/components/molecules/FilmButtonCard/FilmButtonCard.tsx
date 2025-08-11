import React, { useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { ButtonState, Film } from '~/shared/types';
import { LoadingSpinner } from '~/components/atoms';
import { CardFront } from './CardFront';
import { CardBack } from './CardBack';
import {
  getCardStyles,
  cardContentStyles,
  titleStyles,
  loadingOverlayStyles,
  getFlipContainerStyles,
} from './FilmButtonCard.styles';

export interface FilmButtonCardProps {
  title: string;
  color: string;
  posterUrl?: string;
  state: ButtonState;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  'data-testid'?: string;
  // New props for flipping
  film?: Film;
  enableFlipping?: boolean;
}

// Alternative interface for Film object usage
export interface FilmButtonCardWithFilmProps {
  film: Film;
  color: string;
  state?: ButtonState;
  disabled?: boolean;
  onClick?: (film: Film) => void;
  className?: string;
  'data-testid'?: string;
  enableFlipping?: boolean;
}

export const FilmButtonCard: React.FC<FilmButtonCardProps> = ({
  title,
  color,
  posterUrl,
  state,
  onClick,
  disabled = false,
  className,
  'data-testid': dataTestId = 'film-button-card',
  film,
  enableFlipping = false,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageError, setImageError] = useState(false);
  const isLoading = state === ButtonState.LOADING;
  const isSuccess = state === ButtonState.SUCCESS;
  const isDisabled = disabled || isLoading;
  const canFlip = enableFlipping && isSuccess && film;

  // Use poster image only if it loaded successfully
  const effectivePosterUrl = imageError ? undefined : posterUrl;

  const cardStyles = getCardStyles({
    state,
    color,
    posterUrl: effectivePosterUrl,
    disabled: isDisabled,
  });

  const handleImageError = () => {
    setImageError(true);
  };

  const handleClick = () => {
    if (!isDisabled) {
      if (canFlip && isSuccess) {
        // If card can flip and is in success state, flip it
        setIsFlipped(!isFlipped);
      } else {
        // Otherwise, handle the normal click (fetch film)
        onClick();
      }
    }
  };

  const handleMouseEnter = () => {
    if (canFlip && !isFlipped) {
      // Only flip on hover for desktop when not already flipped
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    if (canFlip && isFlipped) {
      // Flip back on mouse leave for desktop
      setIsFlipped(false);
    }
  };

  return (
    <Card
      sx={{
        ...cardStyles,
        perspective: '1000px', // Enable 3D transform perspective
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      data-testid={dataTestId}
    >
      {canFlip ? (
        // Flippable card content
        <Box sx={getFlipContainerStyles(isFlipped)}>
          <CardFront
            title={title}
            posterUrl={posterUrl}
            onImageError={handleImageError}
          />
          <CardBack film={film} />
        </Box>
      ) : (
        // Original card content for non-success states
        <CardContent sx={cardContentStyles}>
          {isLoading ? (
            <Box sx={loadingOverlayStyles}>
              <LoadingSpinner
                color="inherit"
                size={40}
                data-testid={`${dataTestId}-loading`}
              />
            </Box>
          ) : (
            <Typography
              variant="h6"
              component="h3"
              sx={titleStyles}
              data-testid={`${dataTestId}-title`}
            >
              {title}
            </Typography>
          )}
        </CardContent>
      )}

      {/* Visual overlays for state management */}
      {state === ButtonState.SUCCESS && posterUrl && !canFlip && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
            zIndex: 1,
          }}
        />
      )}

      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 1,
          }}
        />
      )}
    </Card>
  );
};

// Alternative component for Film object usage
export const FilmButtonCardWithFilm: React.FC<FilmButtonCardWithFilmProps> = ({
  film,
  color,
  state = ButtonState.DEFAULT,
  disabled = false,
  onClick,
  className,
  'data-testid': dataTestId = 'film-button-card',
  enableFlipping = false,
}) => {
  const handleFilmClick = () => {
    if (onClick) {
      onClick(film);
    }
  };

  return (
    <FilmButtonCard
      title={film.title}
      color={color}
      posterUrl={film.poster_url || film.image}
      state={state}
      onClick={handleFilmClick}
      disabled={disabled}
      className={className}
      data-testid={dataTestId}
      film={film}
      enableFlipping={enableFlipping}
    />
  );
};

export default FilmButtonCard;
