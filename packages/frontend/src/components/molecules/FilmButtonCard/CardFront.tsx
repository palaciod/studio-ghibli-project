import React, { useState } from 'react';
import { Box } from '@mui/material';
import { FilmTitle } from '~/components/atoms/FilmTitle/FilmTitle';
import {
  absolutePositioning,
  backgroundStyles,
  gradients,
  transitions,
  typographySizes,
} from '~/shared/styles/utilities';

export interface CardFrontProps {
  title: string;
  posterUrl?: string;
  onImageError?: () => void;
}

export const CardFront: React.FC<CardFrontProps> = ({
  title,
  posterUrl,
  onImageError,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
    onImageError?.();
  };

  // Don't show background image if there was an error loading it
  const showBackgroundImage = posterUrl && !imageError;

  return (
    <Box
      sx={{
        ...absolutePositioning.fullCover,
        backfaceVisibility: 'hidden',
        transform: 'rotateY(0deg)',
        transition: transitions.cardFlip,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        backgroundImage: showBackgroundImage ? `url(${posterUrl})` : 'none',
        ...backgroundStyles.cover,
        borderRadius: 1,
        overflow: 'hidden',
        '&::before': showBackgroundImage
          ? {
              content: '""',
              ...absolutePositioning.fullCover,
              background: gradients.posterOverlay,
              zIndex: 1,
            }
          : {},
      }}
    >
      {/* Hidden image element to detect loading errors */}
      {posterUrl && !imageError && (
        <img
          src={posterUrl}
          alt=""
          style={{ display: 'none' }}
          onError={handleImageError}
        />
      )}

      <FilmTitle variant="primary" sx={{ zIndex: 2, position: 'relative' }}>
        {title}
      </FilmTitle>

      {/* Show fallback text if image failed to load */}
      {imageError && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            backgroundColor: gradients.lightOverlay,
            color: 'rgba(255, 255, 255, 0.7)',
            padding: '2px 6px',
            borderRadius: 1,
            fontSize: typographySizes.captionLarge,
            zIndex: 2,
          }}
        >
          Image unavailable
        </Box>
      )}
    </Box>
  );
};

export default CardFront;
