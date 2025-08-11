import { useState, useCallback } from 'react';
import { RETRY_CONFIG } from '~/shared/constants';

export interface UseFilmFetchingResult {
  isLoading: boolean;
  error: string | null;
  retryCount: number;
  fetchFilm: (filmId: string) => Promise<void>;
  resetError: () => void;
}

export interface FilmFetchingOptions {
  maxRetries?: number;
  baseDelayMs?: number;
  timeoutMs?: number;
}

/**
 * Custom hook for film data fetching with retry logic and error handling
 * Implements exponential backoff for retries and comprehensive error management
 */
export const useFilmFetching = (
  options: FilmFetchingOptions = {},
): UseFilmFetchingResult => {
  const {
    maxRetries = RETRY_CONFIG.MAX_ATTEMPTS,
    baseDelayMs = RETRY_CONFIG.BASE_DELAY_MS,
    timeoutMs = RETRY_CONFIG.FETCH_TIMEOUT_MS,
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Calculate exponential backoff delay
  const calculateDelay = useCallback(
    (attempt: number): number => {
      return baseDelayMs * Math.pow(2, attempt);
    },
    [baseDelayMs],
  );

  // Simulate film data fetching with configurable success/failure
  const simulateFilmFetch = useCallback(
    async (filmId: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        let isResolved = false;

        // Main timeout for the request
        const requestTimeout = setTimeout(() => {
          if (!isResolved) {
            isResolved = true;
            // Simulate different scenarios based on filmId for testing
            // In a real app, this would be an actual API call
            const shouldFail = Math.random() < 0.3; // 30% chance of failure for testing

            if (shouldFail) {
              reject(new Error(`Failed to fetch film data for ${filmId}`));
            } else {
              resolve();
            }
          }
        }, timeoutMs);

        // Handle timeout scenario - slightly longer than main timeout
        setTimeout(() => {
          if (!isResolved) {
            isResolved = true;
            clearTimeout(requestTimeout);
            reject(new Error('Request timeout'));
          }
        }, timeoutMs + 500);

        // Cleanup timeouts when promise resolves/rejects (implicit)
        // The timeouts will be cleared automatically when the promise settles
      });
    },
    [timeoutMs],
  );

  // Main fetch function with retry logic
  const fetchFilm = useCallback(
    async (filmId: string): Promise<void> => {
      if (isLoading) {
        return; // Prevent concurrent requests
      }

      setIsLoading(true);
      setError(null);

      let currentAttempt = 0;

      while (currentAttempt <= maxRetries) {
        try {
          setRetryCount(currentAttempt);

          // Add delay for retries (exponential backoff)
          if (currentAttempt > 0) {
            const delay = calculateDelay(currentAttempt - 1);
            await new Promise((resolve) => setTimeout(resolve, delay));
          }

          await simulateFilmFetch(filmId);

          // Success - reset states and exit
          setIsLoading(false);
          setRetryCount(0);
          return;
        } catch (err) {
          currentAttempt++;

          // If we've exhausted all retries, set error and exit
          if (currentAttempt > maxRetries) {
            const errorMessage =
              err instanceof Error ? err.message : 'An unknown error occurred';

            setError(`Failed after ${maxRetries} attempts: ${errorMessage}`);
            setIsLoading(false);
            setRetryCount(maxRetries);
            return;
          }
        }
      }
    },
    [isLoading, maxRetries, calculateDelay, simulateFilmFetch],
  );

  // Reset error state
  const resetError = useCallback(() => {
    setError(null);
    setRetryCount(0);
  }, []);

  return {
    isLoading,
    error,
    retryCount,
    fetchFilm,
    resetError,
  };
};
