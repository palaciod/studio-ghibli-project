import { ButtonState } from '~/shared/types';
import {
  ANIMATIONS,
  LAYOUT,
  BREAKPOINTS,
  COMPONENT_DEFAULTS,
  EFFECTS,
} from '~/shared/constants';

export interface ButtonStyleProps {
  state: ButtonState;
  color: string;
  posterUrl?: string;
  disabled?: boolean;
}

export const getCardStyles = ({
  state,
  color,
  posterUrl,
  disabled,
}: ButtonStyleProps) => {
  const isLoading = state === ButtonState.LOADING;
  const isSuccess = state === ButtonState.SUCCESS && posterUrl;
  const isDisabled = disabled || isLoading;

  return {
    backgroundColor: isSuccess ? 'transparent' : color,
    backgroundImage: isSuccess ? `url(${posterUrl})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    filter: isLoading ? `blur(${EFFECTS.BLUR_LOADING})` : EFFECTS.BLUR_NONE,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    transition: `all ${ANIMATIONS.TRANSITION_NORMAL} ${ANIMATIONS.EASING_SMOOTH}`,

    // Rectangular dimensions - taller than wide (portrait)
    width: '100%',
    height: LAYOUT.CARD_HEIGHT_DESKTOP, // Fixed height to create tall rectangular shape
    aspectRatio: LAYOUT.ASPECT_RATIO_PORTRAIT, // 2:3 ratio makes it taller than wide (portrait rectangle)

    position: 'relative' as const,
    overflow: 'hidden',
    borderRadius: 1,
    boxShadow: 2,

    // Default state
    transform: ANIMATIONS.SCALE_DEFAULT,
    opacity:
      state === ButtonState.DISABLED
        ? COMPONENT_DEFAULTS.OPACITY_SEMI
        : COMPONENT_DEFAULTS.OPACITY_VISIBLE,

    // Loading state overlay
    ...(isLoading && {
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: COMPONENT_DEFAULTS.Z_INDEX_OVERLAY,
      },
    }),

    // Success state gradient overlay
    ...(isSuccess && {
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
        zIndex: COMPONENT_DEFAULTS.Z_INDEX_OVERLAY,
      },
    }),

    // Disabled state
    ...(state === ButtonState.DISABLED && {
      filter: 'grayscale(50%)',
    }),

    // Hover effects (only when not disabled)
    ...(!isDisabled && {
      '&:hover': {
        transform: ANIMATIONS.SCALE_HOVER,
        boxShadow: EFFECTS.SHADOW_HIGH,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          zIndex: COMPONENT_DEFAULTS.Z_INDEX_OVERLAY,
        },
      },
      '&:active': {
        transform: ANIMATIONS.SCALE_ACTIVE,
        transition: `transform ${ANIMATIONS.TRANSITION_FAST} ease`,
      },
    }),

    // Responsive design with tall rectangular proportions
    [`@media (max-width: ${BREAKPOINTS.DESKTOP_MIN}px)`]: {
      height: LAYOUT.CARD_HEIGHT_TABLET,
      aspectRatio: LAYOUT.ASPECT_RATIO_TABLET, // Still taller than wide on tablets
    },
    [`@media (max-width: ${BREAKPOINTS.TABLET_MIN}px)`]: {
      height: LAYOUT.CARD_HEIGHT_MOBILE,
      aspectRatio: LAYOUT.ASPECT_RATIO_MOBILE, // Still taller than wide on mobile
    },
  };
};

export const cardContentStyles = {
  display: 'flex',
  flexDirection: 'column' as const,
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%', // Fill the card height
  width: '100%', // Fill the card width
  position: 'relative' as const,
  padding: 2,
  zIndex: COMPONENT_DEFAULTS.Z_INDEX_CONTENT,
};

export const titleStyles = {
  color: 'white',
  textAlign: 'center' as const,
  fontWeight: 600,
  fontSize: '1.25rem',
  margin: 0,
  textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)',
  zIndex: COMPONENT_DEFAULTS.Z_INDEX_FLOATING,
  position: 'relative' as const,
  lineHeight: 1.2,
};

export const loadingOverlayStyles = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: COMPONENT_DEFAULTS.Z_INDEX_FLOATING,
};

export const getFlipContainerStyles = (isFlipped: boolean) => ({
  position: 'relative' as const,
  width: '100%',
  height: '100%',
  transformStyle: 'preserve-3d' as const,
  transition: `transform ${ANIMATIONS.TRANSITION_SLOW} ${ANIMATIONS.EASING_EASE_IN_OUT}`,
  transform: isFlipped ? ANIMATIONS.FLIP_BACK : ANIMATIONS.FLIP_FRONT,
});
