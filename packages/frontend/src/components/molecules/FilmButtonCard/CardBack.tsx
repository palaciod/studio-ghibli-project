import React from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
import { Film } from '~/shared/types';
import {
  textShadows,
  absolutePositioning,
  backgroundStyles,
  gradients,
  typographySizes,
  transitions,
} from '~/shared/styles/utilities';

export interface CardBackProps {
  film: Film;
}

export const CardBack: React.FC<CardBackProps> = ({ film }) => {
  return (
    <Box
      sx={{
        ...absolutePositioning.fullCover,
        backfaceVisibility: 'hidden',
        transform: 'rotateY(180deg)',
        transition: transitions.cardFlip,
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        backgroundColor: gradients.darkBackground,
        borderRadius: 1,
        overflow: 'hidden',
        color: 'white',
      }}
    >
      {/* Movie Banner Background */}
      {film.image && (
        <Box
          sx={{
            ...absolutePositioning.fullCover,
            backgroundImage: `url(${film.image})`,
            ...backgroundStyles.cover,
            opacity: 0.2,
            zIndex: 0,
          }}
        />
      )}

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Title */}
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 700,
            fontSize: typographySizes.titlePrimary,
            marginBottom: 1,
            textAlign: 'center',
            textShadow: textShadows.primary,
            lineHeight: 1.2,
          }}
        >
          {film.title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            fontSize: typographySizes.bodySmall,
            lineHeight: 1.3,
            marginBottom: 1.5,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            textShadow: textShadows.light,
          }}
        >
          {film.description}
        </Typography>

        {/* Movie Details */}
        <Stack spacing={0.5} sx={{ flex: 1, justifyContent: 'flex-end' }}>
          <Typography
            variant="caption"
            sx={{
              fontSize: typographySizes.captionLarge,
              fontWeight: 600,
              textShadow: textShadows.light,
            }}
          >
            Director: {film.director}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontSize: typographySizes.captionSmall,
                textShadow: textShadows.light,
              }}
            >
              {film.releaseDate}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                fontSize: typographySizes.captionSmall,
                textShadow: textShadows.light,
              }}
            >
              {film.runningTime} min
            </Typography>
          </Box>

          {/* Rotten Tomatoes Score */}
          <Box
            sx={{ display: 'flex', justifyContent: 'center', marginTop: 0.5 }}
          >
            <Chip
              label={`${film.rtScore}% RT`}
              size="small"
              sx={{
                backgroundColor: gradients.lightOverlay,
                color: 'white',
                fontSize: typographySizes.captionSmall,
                height: '20px',
                fontWeight: 600,
                backdropFilter: 'blur(4px)',
              }}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default CardBack;
