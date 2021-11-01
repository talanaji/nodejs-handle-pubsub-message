'use strict';

jest.mock('@google-cloud/pubsub');

const mockIsCached = jest.fn();
const mockSetCache = jest.fn();

jest.mock('../../utils/cache', () => ({
  isCached: mockIsCached,
  setCache: mockSetCache,
}));

// tests
describe('pubsub', () => {
  beforeEach(() => {
    mockIsCached.mockReturnValue(false);
    jest.resetModules();
    jest.resetAllMocks();
  });

  describe('readMessage', () => {
    const { readMessage } = require('../pubsub');

    describe('When function receive a pubsub message', () => {
      const message = {
        messageId: '1',
        data: Buffer.from(JSON.stringify({ action: 'deleteToken' })).toString('base64'),
      };
      it('should return data', () => {
        expect(readMessage(message)).toEqual({ action: 'deleteToken' });
        expect(mockIsCached).toHaveBeenCalled();
        expect(mockSetCache).toHaveBeenCalled();
      });
    });

    describe('When function receive duplicated pubsub message', () => {
      const message = {
        messageId: '1',
        data: '',
      };
      beforeEach(() => {
        mockIsCached.mockReturnValue(true);
      });

      it('should throw error', () => {
        expect(() => {
          readMessage(message);
        }).toThrowError('duplicated id');
      });
    });

    describe('When function receive invalid pubsub message', () => {
      const message = {
        messageId: '1',
        data: '',
      };
      it('should throw error', () => {
        expect(() => {
          readMessage(message);
        }).toThrowError('Unexpected end of JSON input');
      });
    });
  });
});
