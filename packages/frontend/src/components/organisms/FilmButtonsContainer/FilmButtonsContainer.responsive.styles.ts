import {
  LAYOUT,
  SPACING,
  BREAKPOINTS,
  ANIMATIONS,
  GRID_LAYOUTS,
} from '~/shared/constants';

// Enhanced responsive layout with more precise breakpoints
export const containerStyles = {
  width: '100%',
  maxWidth: LAYOUT.MAX_CONTAINER_WIDTH,
  margin: '0 auto',
  padding: {
    xs: SPACING.MOBILE_PADDING, // 16px on mobile
    sm: SPACING.TABLET_PADDING, // 24px on tablet
    md: SPACING.DESKTOP_PADDING, // 32px on desktop
    lg: SPACING.LARGE_PADDING, // 40px on large screens
  },
};

export const buttonGridStyles = {
  display: 'grid',
  gap: {
    xs: SPACING.MOBILE_GAP, // 16px gap on mobile
    sm: SPACING.TABLET_GAP, // 24px gap on tablet
    md: SPACING.DESKTOP_GAP, // 32px gap on desktop
    lg: SPACING.DESKTOP_GAP, // Keep consistent gap on large screens
  },

  // Enhanced responsive grid layout with intermediate breakpoints
  gridTemplateColumns: {
    xs: GRID_LAYOUTS.COLUMNS_MOBILE, // Mobile: 1 column (0-599px)
    sm: GRID_LAYOUTS.COLUMNS_TABLET, // Tablet: 2 columns (600-959px)
    md: GRID_LAYOUTS.COLUMNS_DESKTOP_MEDIUM, // Medium: Still 2 columns (960-1199px)
    lg: GRID_LAYOUTS.COLUMNS_DESKTOP_LARGE, // Large: 4 columns (1200px+)
  },

  // Responsive row heights
  gridAutoRows: {
    xs: GRID_LAYOUTS.ROWS_MOBILE, // Smaller on mobile
    sm: GRID_LAYOUTS.ROWS_TABLET, // Medium on tablet
    md: GRID_LAYOUTS.ROWS_DESKTOP, // Standard on desktop
    lg: GRID_LAYOUTS.ROWS_LARGE, // Slightly larger on large screens
  },

  // Alignment
  justifyItems: 'stretch',
  alignItems: 'stretch',

  // Smooth transitions for layout changes
  transition: `all ${ANIMATIONS.TRANSITION_NORMAL} ${ANIMATIONS.EASING_SMOOTH}`,

  // Ensure proper spacing and prevent overflow
  width: '100%',
  boxSizing: 'border-box' as const,
};

// Enhanced grid item styles with responsive sizing
export const gridItemStyles = {
  width: '100%',
  minHeight: {
    xs: SPACING.CARD_SIZE_MOBILE, // Mobile: compact
    sm: SPACING.CARD_SIZE_TABLET, // Tablet: medium
    md: SPACING.CARD_SIZE_DESKTOP, // Desktop: standard
    lg: SPACING.CARD_SIZE_LARGE, // Large: spacious
  },

  // Responsive aspect ratio maintenance
  aspectRatio: {
    xs: '16/9', // Wider aspect ratio on mobile for readability
    sm: '4/3', // Balanced aspect ratio on tablet
    md: '1/1', // Square aspect ratio on desktop
    lg: '1/1', // Keep square on large screens
  },

  // Ensure proper box sizing
  boxSizing: 'border-box' as const,
  overflow: 'hidden',
};

// Container for error states and loading overlays
export const overlayContainerStyles = {
  position: 'relative' as const,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

// Enhanced breakpoints with more precise control
export const responsiveBreakpoints = {
  mobile: BREAKPOINTS.MOBILE,
  tablet: BREAKPOINTS.TABLET,
  desktop: BREAKPOINTS.DESKTOP,
  large: `(min-width: ${BREAKPOINTS.LARGE_MIN}px)`,
  ultraWide: '(min-width: 1600px)',
};

// Responsive typography scaling
export const responsiveTypography = {
  fontSize: {
    xs: '1rem', // 16px on mobile
    sm: '1.1rem', // 17.6px on tablet
    md: '1.25rem', // 20px on desktop
    lg: '1.25rem', // Keep consistent on large
  },
  lineHeight: {
    xs: 1.2,
    sm: 1.3,
    md: 1.2,
    lg: 1.2,
  },
};

// Animation variants for different screen sizes
export const responsiveAnimations = {
  transition: {
    xs: `all ${ANIMATIONS.TRANSITION_FAST} ${ANIMATIONS.EASING_EASE_IN_OUT}`, // Faster on mobile for better performance
    sm: `all ${ANIMATIONS.TRANSITION_NORMAL} ${ANIMATIONS.EASING_EASE_IN_OUT}`, // Standard on tablet
    md: `all ${ANIMATIONS.TRANSITION_NORMAL} ${ANIMATIONS.EASING_SMOOTH}`, // Smooth on desktop
    lg: `all ${ANIMATIONS.TRANSITION_NORMAL} ${ANIMATIONS.EASING_SMOOTH}`, // Keep smooth on large
  },

  hover: {
    xs: 'none', // Disable hover effects on mobile (touch devices)
    sm: ANIMATIONS.SCALE_HOVER, // Subtle on tablet
    md: ANIMATIONS.SCALE_HOVER, // Standard on desktop
    lg: ANIMATIONS.SCALE_HOVER, // Keep consistent on large
  },
};

// Layout testing utilities
export const layoutTestingStyles = {
  debugBorder: {
    border: '2px solid red',
    '& > *': {
      border: '1px solid blue',
    },
  },

  debugGrid: {
    '&::before': {
      content: '"Grid Active"',
      position: 'absolute' as const,
      top: 0,
      left: 0,
      backgroundColor: 'rgba(255, 0, 0, 0.8)',
      color: 'white',
      padding: '4px 8px',
      fontSize: '12px',
      zIndex: 1000,
    },
  },
};

// Accessibility enhancements for different screen sizes
export const accessibilityStyles = {
  focusVisible: {
    outline: {
      xs: '2px solid #2196f3', // Thicker outline on mobile for touch
      sm: '2px solid #2196f3',
      md: '1px solid #2196f3', // Standard on desktop
      lg: '1px solid #2196f3',
    },
    outlineOffset: {
      xs: '4px', // More space on mobile
      sm: '3px',
      md: '2px',
      lg: '2px',
    },
  },

  minTouchTarget: {
    xs: '44px', // Minimum touch target on mobile
    sm: '40px',
    md: '36px',
    lg: '36px',
  },
};
