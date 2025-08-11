// ===========================================
// ANIMATION & TRANSITION CONSTANTS
// ===========================================

export const ANIMATIONS = {
  // Durations (in seconds)
  TRANSITION_FAST: '0.1s',
  TRANSITION_NORMAL: '0.3s',
  TRANSITION_SLOW: '0.6s',

  // Easings
  EASING_SMOOTH: 'cubic-bezier(0.4, 0, 0.2, 1)',
  EASING_EASE_IN_OUT: 'ease-in-out',
  EASING_EASE: 'ease',

  // Transform values
  FLIP_FRONT: 'rotateY(0deg)',
  FLIP_BACK: 'rotateY(180deg)',
  SCALE_HOVER: 'scale(1.02)',
  SCALE_ACTIVE: 'scale(0.98)',
  SCALE_DEFAULT: 'scale(1)',

  // 3D Properties
  PERSPECTIVE: '1000px',
} as const;

// ===========================================
// LAYOUT & SIZING CONSTANTS
// ===========================================

export const LAYOUT = {
  // Card Heights (responsive)
  CARD_HEIGHT_DESKTOP: '280px',
  CARD_HEIGHT_TABLET: '240px',
  CARD_HEIGHT_MOBILE: '200px',

  // Aspect Ratios
  ASPECT_RATIO_PORTRAIT: '2/3', // Taller than wide
  ASPECT_RATIO_TABLET: '1.5/2.5', // Portrait on tablet
  ASPECT_RATIO_MOBILE: '1/1.5', // Portrait on mobile

  // Container Constraints
  MAX_CONTAINER_WIDTH: '1200px',
  MIN_CARD_HEIGHT: '200px',

  // Grid Auto Rows
  GRID_AUTO_ROWS: 'minmax(200px, auto)',
} as const;

// ===========================================
// RESPONSIVE BREAKPOINTS
// ===========================================

export const BREAKPOINTS = {
  // Media Query Values (in pixels)
  MOBILE_MAX: 600,
  TABLET_MIN: 600,
  TABLET_MAX: 960,
  DESKTOP_MIN: 960,
  LARGE_MIN: 1200,

  // Media Query Strings
  MOBILE: '(max-width: 599px)',
  TABLET: '(min-width: 600px) and (max-width: 959px)',
  DESKTOP: '(min-width: 960px)',
  LARGE: '(min-width: 1200px)',
} as const;

// ===========================================
// SPACING & SIZING VALUES
// ===========================================

export const SPACING = {
  // Material-UI spacing multipliers
  MOBILE_PADDING: 2, // 16px
  TABLET_PADDING: 3, // 24px
  DESKTOP_PADDING: 4, // 32px
  LARGE_PADDING: 5, // 40px

  // Gap values (same scale)
  MOBILE_GAP: 2, // 16px
  TABLET_GAP: 3, // 24px
  DESKTOP_GAP: 4, // 32px

  // Card Sizes
  CARD_SIZE_MOBILE: '160px',
  CARD_SIZE_TABLET: '180px',
  CARD_SIZE_DESKTOP: '200px',
  CARD_SIZE_LARGE: '220px',
} as const;

// ===========================================
// COMPONENT DEFAULTS
// ===========================================

export const COMPONENT_DEFAULTS = {
  // Loading Spinner
  SPINNER_SIZE: 40,
  SPINNER_THICKNESS: 3.6,

  // Z-Index Layers
  Z_INDEX_BASE: 0,
  Z_INDEX_OVERLAY: 1,
  Z_INDEX_CONTENT: 2,
  Z_INDEX_FLOATING: 3,

  // Opacity Values
  OPACITY_HIDDEN: 0,
  OPACITY_DIM: 0.2,
  OPACITY_SEMI: 0.6,
  OPACITY_VISIBLE: 1,
} as const;

// ===========================================
// VISUAL EFFECTS
// ===========================================

export const EFFECTS = {
  // Blur Values
  BLUR_LOADING: '2px',
  BLUR_NONE: 'none',

  // Border Radius
  BORDER_RADIUS: 1, // Material-UI units

  // Box Shadow Levels
  SHADOW_LOW: 2,
  SHADOW_HIGH: 8,
} as const;

// ===========================================
// GRID LAYOUT CONFIGURATIONS
// ===========================================

export const GRID_LAYOUTS = {
  // Column Configurations
  COLUMNS_MOBILE: '1fr',
  COLUMNS_TABLET: 'repeat(2, 1fr)',
  COLUMNS_DESKTOP_MEDIUM: 'repeat(2, 1fr)',
  COLUMNS_DESKTOP_LARGE: 'repeat(4, 1fr)',

  // Row Configurations
  ROWS_MOBILE: 'minmax(160px, auto)',
  ROWS_TABLET: 'minmax(180px, auto)',
  ROWS_DESKTOP: 'minmax(200px, auto)',
  ROWS_LARGE: 'minmax(220px, auto)',
} as const;

// ===========================================
// RETRY & TIMING CONSTANTS
// ===========================================

export const RETRY_CONFIG = {
  MAX_ATTEMPTS: 3,
  BASE_DELAY_MS: 1000, // 1 second
  FETCH_TIMEOUT_MS: 3000, // 3 seconds
} as const;
