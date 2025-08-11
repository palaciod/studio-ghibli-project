import React from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
import { Film } from '~/shared/types';

export interface CardBackProps {
  film: Film;
}

export const CardBack: React.FC<CardBackProps> = ({ film }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backfaceVisibility: 'hidden',
        transform: 'rotateY(180deg)',
        transition: 'transform 0.6s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        borderRadius: 1,
        overflow: 'hidden',
        color: 'white',
      }}
    >
      {/* Movie Banner Background */}
      {film.image && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${film.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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
            fontSize: '1.1rem',
            marginBottom: 1,
            textAlign: 'center',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            lineHeight: 1.2,
          }}
        >
          {film.title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            fontSize: '0.75rem',
            lineHeight: 1.3,
            marginBottom: 1.5,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
          }}
        >
          {film.description}
        </Typography>

        {/* Movie Details */}
        <Stack spacing={0.5} sx={{ flex: 1, justifyContent: 'flex-end' }}>
          <Typography
            variant="caption"
            sx={{
              fontSize: '0.7rem',
              fontWeight: 600,
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
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
                fontSize: '0.65rem',
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
              }}
            >
              {film.release_date}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                fontSize: '0.65rem',
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
              }}
            >
              {film.running_time} min
            </Typography>
          </Box>

          {/* Rotten Tomatoes Score */}
          <Box
            sx={{ display: 'flex', justifyContent: 'center', marginTop: 0.5 }}
          >
            <Chip
              label={`${film.rt_score}% RT`}
              size="small"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontSize: '0.65rem',
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
