import axios from 'axios';
import { HttpService } from './Http.service';

// Mock the whole axios module
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
let httpService: HttpService;

describe('HttpService', () => {
  beforeEach(() => {
    mockedAxios.create.mockReturnThis();
    httpService = new HttpService();
  });

  afterEach(() => {
    // Clear all mocks after each test
    jest.clearAllMocks();
  });

  it('should make a GET request with correct parameters', async () => {
    // Setup mock to resolve with specific data
    mockedAxios.get.mockResolvedValue({ data: 'response data' });

    const endpoint = 'http://example.com/data';
    const params = { foo: 'bar', details: { nested: true, number: 42 } };
    const headers = { Authorization: 'Bearer token' };

    // Call the method
    const response = await httpService.get({
      endpoint,
      queryParameters: params,
      headers,
    });

    // Check if axios.get was called correctly
    expect(mockedAxios.get).toHaveBeenCalledWith(endpoint, {
      headers,
      params,
    });
    // Check the response
    expect(response.data).toBe('response data');
  });

  it('should make a POST request with correct parameters', async () => {
    mockedAxios.post.mockResolvedValue({ data: 'response data' });

    const endpoint = 'http://example.com/submit';
    const body = { list: [1, 2, 3], isValid: true };
    const headers = { 'Content-Type': 'application/json' };

    const response = await httpService.post({ endpoint, body, headers });

    expect(mockedAxios.post).toHaveBeenCalledWith(endpoint, body, {
      headers,
    });
    expect(response.data).toBe('response data');
  });

  it('should configure axios with 5 second timeout', () => {
    expect(mockedAxios.create).toHaveBeenCalledWith({
      timeout: 5000,
    });
  });

  it('should retry GET request once on failure then succeed', async () => {
    // First call fails, second succeeds
    mockedAxios.get
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce({ data: 'success on retry' });

    const endpoint = 'http://example.com/data';
    const response = await httpService.get({ endpoint });

    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    expect(response.data).toBe('success on retry');
  });

  it('should retry POST request once on failure then succeed', async () => {
    // First call fails, second succeeds
    mockedAxios.post
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce({ data: 'success on retry' });

    const endpoint = 'http://example.com/submit';
    const body = { test: true };
    const response = await httpService.post({ endpoint, body });

    expect(mockedAxios.post).toHaveBeenCalledTimes(2);
    expect(response.data).toBe('success on retry');
  });

  it('should fail after one retry attempt for GET requests', async () => {
    const error = new Error('Network error');
    mockedAxios.get.mockRejectedValue(error);

    const endpoint = 'http://example.com/data';

    await expect(httpService.get({ endpoint })).rejects.toThrow(
      'Network error',
    );
    expect(mockedAxios.get).toHaveBeenCalledTimes(2); // Initial call + 1 retry
  });

  it('should fail after one retry attempt for POST requests', async () => {
    const error = new Error('Network error');
    mockedAxios.post.mockRejectedValue(error);

    const endpoint = 'http://example.com/submit';
    const body = { test: true };

    await expect(httpService.post({ endpoint, body })).rejects.toThrow(
      'Network error',
    );
    expect(mockedAxios.post).toHaveBeenCalledTimes(2); // Initial call + 1 retry
  });
});
