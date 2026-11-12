import * as Shared from '@/shared/index';
import {describe, expect, test} from 'vitest';

describe('[Unit 테스트] - axios', () => {
  test('createAxiosError - Axios 커스텀 에러', () => {
    // Given
    const case1 = Shared.axios.createAxiosError('test message', '0101', null, null, {
      status: Shared.http.EHTTP_STATUS.BAD_REQUEST
    });
    const case2 = Shared.axios.createAxiosError('test message2', '0102', null, null, {
      status: Shared.http.EHTTP_STATUS.BAD_REQUEST,
      data: {
        userId: '1234',
        nickname: 'test',
        password: '1234!'
      }
    });

    // When

    // Then
    expect(case1).toStrictEqual({
      isAxiosError: true,
      message: 'test message',
      code: '0101',
      response: {
        status: Shared.http.EHTTP_STATUS.BAD_REQUEST,
        data: {
          message: 'test message',
          code: '0101'
        },
        config: null,
        request: null
      }
    });
    expect(case2).toStrictEqual({
      isAxiosError: true,
      message: 'test message2',
      code: '0102',
      response: {
        status: Shared.http.EHTTP_STATUS.BAD_REQUEST,
        data: {
          message: 'test message2',
          code: '0102',
          userId: '1234',
          password: '1234!',
          nickname: 'test'
        },
        config: null,
        request: null
      }
    });
  });
});
