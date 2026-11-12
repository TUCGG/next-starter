import {describe, expect, test} from 'vitest';

import {apiServer} from '@/api/server';

import repository from '@/repository/server';

describe('[Unit 테스트] - repository/server', () => {
  test('서버 인스턴스는 fetch 어댑터를 사용한다 (Next 캐시 옵션 전달 조건)', () => {
    expect(apiServer.defaults.adapter).toBe('fetch');
  });

  test('서버 레파지토리는 클라이언트와 같은 메서드를 제공한다', () => {
    expect(repository.common.getTest).toBeTypeOf('function');
  });
});
