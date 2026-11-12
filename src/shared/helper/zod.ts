import {ZodError, type ZodType} from 'zod';

export interface ISchemaValidArgs {
  acName?: string;
  schema: ZodType;
  data: unknown;
}

/**
 * schemaValid
 * @description 데이터 스키마 모델의 유효성 검증
 * @param options - 옵션
 * @param [options.acName] - 액션 메서드 이름
 * @param [options.schema] - Zod 스키마 객체
 * @param [options.data] - 검증할 모델 데이터
 *
 * @example
 * schemaValid({
 *   acName: 'ac{액션 메서드 이름}',
 *   schema: {Zod 스키마 객체},
 *   data: {검증할 모델 데이터}
 * });
 */
export const schemaValid = ({acName = 'unknown', schema, data}: ISchemaValidArgs) => {
  const result = schema.safeParse(data);

  if (!result.success) {
    console.error('[SCHEMA VALID ERROR]', `${acName}\n`, result.error.message);
  }
};

/**
 * schemaParse
 * @description Zod 스키마를 사용한 데이터 유효성 검증 및 파싱
 * @param options - 옵션
 * @param [options.acName] - 액션 메서드 이름
 * @param [options.schema] - Zod 스키마 객체
 * @param [options.data] - 검증할 모델 데이터
 * @returns Zod.SafeParseReturn<unknown> - 성공 여부 및 파싱 결과 포함 객체
 *
 * @example
 * const isSchemaValid = schemaParse({
 *   acName: 'ac{액션 메서드 이름}',
 *   schema: {Zod 스키마 객체},
 *   data: {검증할 모델 데이터}
 * });
 *
 * if (isSchemaValid) {...}
 */
export const schemaParse = ({acName = 'unknown', schema, data}: ISchemaValidArgs) => {
  try {
    schema.parse(data);
  } catch (err) {
    if (err instanceof ZodError) {
      console.error('[SCHEMA PARSE ERROR]', `${acName}\n`, err.message);
    } else {
      console.error('[알 수 없는 에러]', `${acName}\n`, err);
    }
  }

  return schema.safeParse(data);
};
