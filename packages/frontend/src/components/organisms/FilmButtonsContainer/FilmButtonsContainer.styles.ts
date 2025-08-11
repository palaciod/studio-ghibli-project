export const containerStyles = {
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: {
    xs: 2, // 16px on mobile
    sm: 3, // 24px on tablet
    md: 4, // 32px on desktop
  },
};

export const buttonGridStyles = {
  display: 'grid',
  gap: {
    xs: 2, // 16px gap on mobile
    sm: 3, // 24px gap on tablet
    md: 4, // 32px gap on desktop
  },

  // Responsive grid layout
  // Mobile: 1 column
  gridTemplateColumns: {
    xs: '1fr',
    // Tablet: 2 columns
    sm: 'repeat(2, 1fr)',
    // Desktop: 4 columns
    lg: 'repeat(4, 1fr)',
  },

  // Ensure equal height for all grid items
  gridAutoRows: 'minmax(200px, auto)',

  // Alignment
  justifyItems: 'stretch',
  alignItems: 'stretch',

  // Animation for grid changes
  transition: 'all 0.3s ease-in-out',
};

// Additional styles for individual grid items if needed
export const gridItemStyles = {
  width: '100%',
  minHeight: {
    xs: '160px', // Smaller on mobile
    sm: '180px', // Medium on tablet
    md: '200px', // Full size on desktop
  },
};

// Container for error states and loading overlays
export const overlayContainerStyles = {
  position: 'relative' as const,
  width: '100%',
  height: '100%',
};

// Responsive breakpoints reference for consistency
export const breakpoints = {
  mobile: '(max-width: 599px)',
  tablet: '(min-width: 600px) and (max-width: 959px)',
  desktop: '(min-width: 960px)',
  large: '(min-width: 1200px)',
};
