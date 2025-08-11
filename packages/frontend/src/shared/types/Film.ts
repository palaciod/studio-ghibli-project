export interface Film {
  id: string;
  title: string;
  description: string;
  director: string;
  releaseDate: string; // camelCase to match GraphQL
  runningTime: number; // camelCase, number to match GraphQL
  rtScore: number; // camelCase, number to match GraphQL
  image?: string;
  movieBanner?: string; // Added to match GraphQL schema
}
