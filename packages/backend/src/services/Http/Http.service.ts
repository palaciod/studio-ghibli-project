import axios from 'axios';
import { AxiosInstance, AxiosResponse } from 'axios';

// Need to export the class itself instead of the
// instance to be able to mock axios correctly
export class HttpService {
  private axios: AxiosInstance;

  public constructor() {
    this.axios = axios.create({
      timeout: 5000, // 5 second timeout
    });
  }

  public async get({
    endpoint,
    queryParameters,
    headers,
  }: {
    endpoint: string;
    queryParameters?: Record<string, any>;
    headers?: Record<string, any>;
  }): Promise<AxiosResponse> {
    return this.executeWithRetry(() =>
      this.axios.get(endpoint, { headers, params: queryParameters }),
    );
  }

  public async post({
    endpoint,
    body,
    headers,
  }: {
    endpoint: string;
    body?: Record<string, any>;
    headers?: Record<string, any>;
  }): Promise<AxiosResponse> {
    return this.executeWithRetry(() =>
      this.axios.post(endpoint, body, { headers }),
    );
  }

  private async executeWithRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 1,
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;

        // Don't retry on the last attempt
        if (attempt === maxRetries) {
          break;
        }

        // Wait before retrying (exponential backoff with small delay)
        const backoffDelay = Math.min(100 * Math.pow(2, attempt), 1000); // 100ms, 200ms, max 1s
        await this.delay(backoffDelay);
      }
    }

    throw lastError!;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
