import React from 'react';
import { Box, BoxProps } from '@mui/material';
import {
  absolutePositioning,
  backgroundStyles,
  gradients,
} from '~/shared/styles/utilities';

export interface BackgroundImageProps extends Omit<BoxProps, 'sx'> {
  imageUrl?: string;
  opacity?: number;
  overlay?: boolean;
  children?: React.ReactNode;
}

export const BackgroundImage: React.FC<BackgroundImageProps> = ({
  imageUrl,
  opacity = 1,
  overlay = false,
  children,
  ...props
}) => {
  return (
    <Box
      sx={{
        ...absolutePositioning.fullCover,
        ...backgroundStyles.cover,
        backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
        opacity,
        zIndex: 0,
        ...(overlay && {
          '&::before': {
            content: '""',
            ...absolutePositioning.fullCover,
            background: gradients.posterOverlay,
            zIndex: 1,
          },
        }),
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default BackgroundImage;
