// Shared styling utilities to avoid duplication
export const textShadows = {
  primary: '2px 2px 4px rgba(0,0,0,0.8)',
  enhanced: '2px 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)',
  light: '1px 1px 2px rgba(0,0,0,0.8)',
} as const;

export const gradients = {
  posterOverlay:
    'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
  darkBackground: 'rgba(0, 0, 0, 0.9)',
  lightOverlay: 'rgba(255, 255, 255, 0.2)',
} as const;

export const backgroundStyles = {
  cover: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
} as const;

export const absolutePositioning = {
  fullCover: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
} as const;
