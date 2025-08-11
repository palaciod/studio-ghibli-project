/**
 * Film-related constants for Studio Ghibli application
 */

// Default film IDs to show initially (4 main Studio Ghibli films)
// These correspond to actual Studio Ghibli film IDs from the API
export const DEFAULT_FILM_IDS = [
  'ebbb6b7c-945c-41ee-a792-de0e43191bd8', // Porco Rosso
  'ea660b10-85c4-4ae3-8a5f-41cea3648e3e', // Kiki's Delivery Service
  'cd3d059c-09f4-4ff3-8d63-bc765a5184fa', // Howl's Moving Castle
  '58611129-2dbc-4a81-a72f-77ddfc1b1b49', // My Neighbor Totoro
] as const;

export type DefaultFilmId = (typeof DEFAULT_FILM_IDS)[number];
