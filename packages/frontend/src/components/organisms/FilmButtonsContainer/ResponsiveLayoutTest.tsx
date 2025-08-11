import React from 'react';
import { Box, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import { FilmButtonsContainer } from './FilmButtonsContainer';
import { BUTTON_COLORS_ARRAY } from '~/shared/constants/colors';
import { MOCK_FILMS } from '~/shared/constants/mocks/filmData';
import {
  responsiveBreakpoints,
  layoutTestingStyles,
} from './FilmButtonsContainer.responsive.styles';

interface ResponsiveLayoutTestProps {
  enableDebug?: boolean;
  showBreakpointInfo?: boolean;
}

export const ResponsiveLayoutTest: React.FC<ResponsiveLayoutTestProps> = ({
  enableDebug = false,
  showBreakpointInfo = true,
}) => {
  const theme = useTheme();

  // Media queries for breakpoint detection
  const isMobile = useMediaQuery(responsiveBreakpoints.mobile);
  const isTablet = useMediaQuery(responsiveBreakpoints.tablet);
  const isDesktop = useMediaQuery(responsiveBreakpoints.desktop);
  const isLarge = useMediaQuery(responsiveBreakpoints.large);
  const isUltraWide = useMediaQuery(responsiveBreakpoints.ultraWide);

  // Determine current breakpoint
  const getCurrentBreakpoint = () => {
    if (isUltraWide) return 'Ultra Wide (1600px+)';
    if (isLarge) return 'Large Desktop (1200px+)';
    if (isDesktop) return 'Desktop (960-1199px)';
    if (isTablet) return 'Tablet (600-959px)';
    if (isMobile) return 'Mobile (0-599px)';
    return 'Unknown';
  };

  // Expected layout for current breakpoint
  const getExpectedLayout = () => {
    if (isUltraWide || isLarge) return '4 columns';
    if (isDesktop || isTablet) return '2 columns';
    if (isMobile) return '1 column';
    return 'Unknown';
  };

  const mockClickHandler = async (film: any) => {
    console.log('Film clicked:', film.title);
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      {showBreakpointInfo && (
        <Paper
          elevation={2}
          sx={{
            padding: 2,
            marginBottom: 3,
            backgroundColor: theme.palette.info.light,
            color: theme.palette.info.contrastText,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Responsive Layout Test
          </Typography>
          <Typography variant="body1">
            <strong>Current Breakpoint:</strong> {getCurrentBreakpoint()}
          </Typography>
          <Typography variant="body1">
            <strong>Expected Layout:</strong> {getExpectedLayout()}
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            <strong>Screen Width:</strong> {window.innerWidth}px ×{' '}
            {window.innerHeight}px
          </Typography>
          <Typography variant="body2">
            <strong>Device Pixel Ratio:</strong> {window.devicePixelRatio}
          </Typography>
        </Paper>
      )}

      <Box
        sx={{
          ...(enableDebug && layoutTestingStyles.debugGrid),
          position: 'relative',
        }}
      >
        <FilmButtonsContainer
          films={MOCK_FILMS}
          colors={[...BUTTON_COLORS_ARRAY]}
          onFilmClick={mockClickHandler}
          data-testid="responsive-layout-test"
        />
      </Box>

      {enableDebug && (
        <Paper
          elevation={1}
          sx={{ padding: 2, marginTop: 3, backgroundColor: '#f5f5f5' }}
        >
          <Typography variant="h6" gutterBottom>
            Debug Information
          </Typography>
          <Typography
            variant="body2"
            component="pre"
            sx={{ fontFamily: 'monospace' }}
          >
            {JSON.stringify(
              {
                breakpoints: {
                  isMobile,
                  isTablet,
                  isDesktop,
                  isLarge,
                  isUltraWide,
                },
                viewport: {
                  width: window.innerWidth,
                  height: window.innerHeight,
                  devicePixelRatio: window.devicePixelRatio,
                },
                muiBreakpoints: {
                  xs: theme.breakpoints.values.xs,
                  sm: theme.breakpoints.values.sm,
                  md: theme.breakpoints.values.md,
                  lg: theme.breakpoints.values.lg,
                  xl: theme.breakpoints.values.xl,
                },
              },
              null,
              2,
            )}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default ResponsiveLayoutTest;
