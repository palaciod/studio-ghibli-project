import React from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { textShadows } from '~/shared/styles/utilities';

export interface FilmTitleProps extends Omit<TypographyProps, 'variant'> {
  variant?: 'primary' | 'card' | 'back';
  children: React.ReactNode;
}

export const FilmTitle: React.FC<FilmTitleProps> = ({
  variant = 'primary',
  children,
  sx,
  ...props
}) => {
  const getVariantStyles = (): any => {
    switch (variant) {
      case 'primary':
        return {
          color: 'white',
          textAlign: 'center' as const,
          fontWeight: 600,
          fontSize: '1.25rem',
          textShadow: textShadows.enhanced,
          lineHeight: 1.2,
        };
      case 'card':
        return {
          color: 'white',
          textAlign: 'center' as const,
          fontWeight: 700,
          fontSize: '1.1rem',
          textShadow: textShadows.primary,
          lineHeight: 1.2,
        };
      case 'back':
        return {
          color: 'white',
          fontWeight: 600,
          fontSize: '0.7rem',
          textShadow: textShadows.light,
        };
      default:
        return {};
    }
  };

  return (
    <Typography
      variant="h6"
      component="h3"
      sx={{
        ...getVariantStyles(),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default FilmTitle;
