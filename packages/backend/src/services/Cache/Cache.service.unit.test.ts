import { CacheService } from './Cache.service';

describe('CacheService', () => {
  let cacheService: CacheService;

  beforeEach(() => {
    cacheService = new CacheService(1000); // 1 second TTL for testing
  });

  afterEach(() => {
    cacheService.clear();
  });

  describe('set and get', () => {
    it('should store and retrieve data', () => {
      const testData = { id: '1', name: 'Test' };
      cacheService.set('test-key', testData);

      const result = cacheService.get('test-key');
      expect(result).toEqual(testData);
    });

    it('should return null for non-existent keys', () => {
      const result = cacheService.get('non-existent');
      expect(result).toBeNull();
    });

    it('should support different data types', () => {
      cacheService.set('string', 'hello');
      cacheService.set('number', 42);
      cacheService.set('array', [1, 2, 3]);
      cacheService.set('object', { test: true });

      expect(cacheService.get('string')).toBe('hello');
      expect(cacheService.get('number')).toBe(42);
      expect(cacheService.get('array')).toEqual([1, 2, 3]);
      expect(cacheService.get('object')).toEqual({ test: true });
    });
  });

  describe('TTL expiration', () => {
    it('should return null for expired entries', async () => {
      cacheService.set('test-key', 'test-value');

      // Wait for expiration
      await new Promise((resolve) => setTimeout(resolve, 1100));

      const result = cacheService.get('test-key');
      expect(result).toBeNull();
    });

    it('should allow custom TTL per entry', async () => {
      cacheService.set('short-ttl', 'value1', 100); // 100ms
      cacheService.set('long-ttl', 'value2', 2000); // 2s

      // Wait 200ms
      await new Promise((resolve) => setTimeout(resolve, 200));

      expect(cacheService.get('short-ttl')).toBeNull();
      expect(cacheService.get('long-ttl')).toBe('value2');
    });
  });

  describe('delete and clear', () => {
    it('should delete specific entries', () => {
      cacheService.set('key1', 'value1');
      cacheService.set('key2', 'value2');

      const deleted = cacheService.delete('key1');

      expect(deleted).toBe(true);
      expect(cacheService.get('key1')).toBeNull();
      expect(cacheService.get('key2')).toBe('value2');
    });

    it('should return false when deleting non-existent key', () => {
      const deleted = cacheService.delete('non-existent');
      expect(deleted).toBe(false);
    });

    it('should clear all entries', () => {
      cacheService.set('key1', 'value1');
      cacheService.set('key2', 'value2');

      cacheService.clear();

      expect(cacheService.get('key1')).toBeNull();
      expect(cacheService.get('key2')).toBeNull();
      expect(cacheService.size()).toBe(0);
    });
  });

  describe('size', () => {
    it('should return correct cache size', () => {
      expect(cacheService.size()).toBe(0);

      cacheService.set('key1', 'value1');
      expect(cacheService.size()).toBe(1);

      cacheService.set('key2', 'value2');
      expect(cacheService.size()).toBe(2);

      cacheService.delete('key1');
      expect(cacheService.size()).toBe(1);
    });
  });

  describe('cleanup', () => {
    it('should remove expired entries during cleanup', async () => {
      cacheService.set('valid', 'value1', 2000); // 2s
      cacheService.set('expired', 'value2', 100); // 100ms

      expect(cacheService.size()).toBe(2);

      // Wait for one to expire
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Cleanup should remove expired entry
      cacheService.cleanup();

      expect(cacheService.size()).toBe(1);
      expect(cacheService.get('valid')).toBe('value1');
      expect(cacheService.get('expired')).toBeNull();
    });
  });
});
