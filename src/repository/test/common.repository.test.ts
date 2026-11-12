import type {AxiosInstance} from 'axios';
import {describe, expect, test, vi} from 'vitest';

import {createCommonRepository} from '../common.repository';

describe('[Unit 테스트] - common.repository', () => {
  test('주입된 인스턴스로 /posts/1/comments 를 호출한다', async () => {
    // Given
    const get = vi.fn().mockResolvedValue({data: []});
    const repo = createCommonRepository({get} as unknown as AxiosInstance);
    const config = {fetchOptions: {next: {tags: ['common-test']}}};

    // When
    await repo.getTest(config);

    // Then
    expect(get).toHaveBeenCalledWith('/posts/1/comments', config);
  });
});
