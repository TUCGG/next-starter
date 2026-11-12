import * as Shared from '@/shared/index';
import {describe, expect, test} from 'vitest';

describe('[Unit 테스트] - hash', () => {
  describe('[generateHash]', () => {
    test('generateHash - 해시 생성', async () => {
      // Given
      const value = 'test';

      // When
      const hash = await Shared.hash.generateHash(value);

      // Then
      expect(hash).toEqual('9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08');
    });

    test('generateHash - 해시 생성 > 시크릿 키 조합', async () => {
      // Given
      const value = 'test';
      const secret = 'qwe123!@#';

      // When
      const hash = await Shared.hash.generateHash(value, secret);

      // Then
      expect(hash).toEqual('1db7fab55facf54c2fd97ddc31ec5dfbc99b2754c02a555ed78b6c80d21bdafd');
    });
  });

  describe('[generateHmac]', () => {
    test('generateHmac - HMAC 해시 생성', async () => {
      // Given
      const secret = 'qwe123!@#';
      const value = 'test';

      // When
      const hash = await Shared.hash.generateHmac(secret, value);

      // Then
      expect(hash).toEqual('4587574be79618cc7304cb51f056998faeb9e32f1b9af987a4b607f62efbfc12');
    });
  });
});
