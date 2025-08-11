// Mock Data
export { MOCK_FILMS } from './mocks/filmData';

// Colors
export {
  FILM_BUTTON_COLORS,
  BUTTON_COLORS_ARRAY,
  getButtonColor,
} from './colors';

// Design System Constants (replaces magic numbers)
export * from './designSystem';
import { RETRY_CONFIG } from './designSystem';

// UI Constants
export const UI_CONSTANTS = {
  FETCH_DELAY_MS: 3000, // 3 second mock delay
  MAX_RETRY_ATTEMPTS: RETRY_CONFIG.MAX_ATTEMPTS, // Maximum retry attempts for failed requests
  RETRY_DELAY_BASE_MS: RETRY_CONFIG.BASE_DELAY_MS, // Base delay for exponential backoff
  BREAKPOINTS: {
    MOBILE: 768, // Mobile breakpoint (1 button per row)
    TABLET: 1024, // Tablet breakpoint (2 buttons per row)
    DESKTOP: 1200, // Desktop breakpoint (4 buttons per row)
  },
} as const;
