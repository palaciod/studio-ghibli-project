import React from 'react';
import { CircularProgress, Box, CircularProgressProps } from '@mui/material';
import { COMPONENT_DEFAULTS } from '~/shared/constants';

export interface LoadingSpinnerProps {
  size?: number | string;
  color?: CircularProgressProps['color'];
  thickness?: number;
  className?: string;
  'data-testid'?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = COMPONENT_DEFAULTS.SPINNER_SIZE,
  color = 'primary',
  thickness = COMPONENT_DEFAULTS.SPINNER_THICKNESS,
  className,
  'data-testid': dataTestId = 'loading-spinner',
}) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      className={className}
      data-testid={`${dataTestId}-container`}
    >
      <CircularProgress
        size={size}
        color={color}
        thickness={thickness}
        data-testid={dataTestId}
      />
    </Box>
  );
};

export default LoadingSpinner;
