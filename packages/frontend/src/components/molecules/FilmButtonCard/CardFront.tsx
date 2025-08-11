import React, { useState } from 'react';
import { Box } from '@mui/material';
import { FilmTitle } from '~/components/atoms/FilmTitle/FilmTitle';

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
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backfaceVisibility: 'hidden',
        transform: 'rotateY(0deg)',
        transition: 'transform 0.6s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        backgroundImage: showBackgroundImage ? `url(${posterUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: 1,
        overflow: 'hidden',
        '&::before': showBackgroundImage
          ? {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
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
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'rgba(255, 255, 255, 0.7)',
            padding: '2px 6px',
            borderRadius: 1,
            fontSize: '0.7rem',
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
