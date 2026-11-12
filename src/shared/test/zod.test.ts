import * as Shared from '@/shared/index';
import {describe, expect, test, vi} from 'vitest';
import {z} from 'zod';

/* eslint-disable sonarjs/no-identical-functions */
describe('[Unit 테스트] - zod', () => {
  test('모델 스키마 검증 > 200 성공 케이스', () => {
    // Given
    const ModelSchema = z.union([
      z.object({
        id: z.string(),
        url: z.url(),
        description: z.string()
      }),
      z.string().nullable() // 204 No Content
    ]);
    const data = {
      id: '1',
      url: 'https://www.google.com',
      description: '설명문구...'
    };

    // When
    const validate = () =>
      Shared.zod.schemaValid({
        acName: 'acTest',
        schema: ModelSchema,
        data
      });

    // Then
    expect(validate).not.toThrow();
  });

  test('모델 스키마 검증 > 204 노데이터 케이스', () => {
    // Given
    const ModelSchema = z.union([
      z.object({
        id: z.string(),
        url: z.url(),
        description: z.string()
      }),
      z.string().nullable() // 204 No Content
    ]);
    const data = '';

    // When
    const validate = () =>
      Shared.zod.schemaValid({
        acName: 'acTest',
        schema: ModelSchema,
        data
      });

    // Then
    expect(validate).not.toThrow();
  });

  test('모델 스키마 검증 > 에러 케이스', () => {
    // Given
    const ModelSchema = z.union([
      z.object({
        id: z.string(),
        url: z.url(),
        description: z.string()
      }),
      z.string().nullable() // 204 No Content
    ]);
    const data = {
      id: 1, // 잘못된 타입의 데이터
      url: 'https://www.google.com',
      description: '설명문구...'
    };

    // When
    // console.error를 감지하기 위해 jest.spyOn 사용
    // @ts-ignore
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // schemaValid 함수 호출 시 ZodError가 console.error에 전달되는지 확인
    Shared.zod.schemaValid({
      acName: 'acTest',
      schema: ModelSchema,
      data
    });

    // Then
    // console.error 함수가 호출되었는지 확인
    expect(consoleErrorSpy).toHaveBeenCalled();

    // 모의(mock)된 console.error 함수를 제거하고 복원(restore)
    consoleErrorSpy.mockRestore();
  });
});
