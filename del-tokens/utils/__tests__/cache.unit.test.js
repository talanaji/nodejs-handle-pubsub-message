'use strict';

// tests
describe('cache', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();
  });

  describe('isCached', () => {
    const { isCached, setCache } = require('../cache');

    describe('When value not cached', () => {
      it('should return undefined', () => {
        expect(isCached('value')).toBe(undefined);
      });
    });

    describe('When value is cached', () => {
      it('should return true', () => {
        setCache('value');
        expect(isCached('value')).toBe(true);
      });
    });

    describe('When value is empty', () => {
      it('should return undefined', () => {
        const result = isCached('');
        expect(result).toBe(undefined);
      });
    });
  });

  describe('setCache', () => {
    const { isCached, setCache } = require('../cache');

    describe('When value not cached', () => {
      it('should return true', () => {
        setCache('value');
        expect(isCached('value')).toBe(true);
      });
    });

    describe('When value is cached', () => {
      it('should return false', () => {
        setCache('value');
        expect(isCached('value')).toBe(true);
        expect(setCache('value')).toBe(false);
      });
    });
  });
});
