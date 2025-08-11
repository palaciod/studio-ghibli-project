// Film Button Colors - Each button gets a distinct color
export const FILM_BUTTON_COLORS = {
  PORCO_ROSSO: '#d79a68', // Warm brown/orange
  KIKIS_DELIVERY: '#c24646', // Deep red
  HOWLS_CASTLE: '#279094', // Teal/turquoise
  TOTORO: '#3e6cac', // Deep blue
} as const;

// Array of colors for easy iteration
export const BUTTON_COLORS_ARRAY = [
  FILM_BUTTON_COLORS.PORCO_ROSSO,
  FILM_BUTTON_COLORS.KIKIS_DELIVERY,
  FILM_BUTTON_COLORS.HOWLS_CASTLE,
  FILM_BUTTON_COLORS.TOTORO,
] as const;

// Color mapping by film index
export const getButtonColor = (index: number): string => {
  return BUTTON_COLORS_ARRAY[index] || FILM_BUTTON_COLORS.PORCO_ROSSO;
};
