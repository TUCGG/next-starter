import type {Metadata} from 'next';

import * as Shared from '@/shared/index';

import {COMMON_CACHE_TAG, TestSchema} from '@/repository/common.repository';
import repository from '@/repository/server';

import {SafeHTMLComponent} from '@/components/index';

import {ClientComments, RefreshForm} from './test.client';

export const metadata: Metadata = {
  title: '테스트'
};

/**
 * getComments
 * @description 서버 조회 (repository/server → apiServer), 캐시 옵션은 호출부에서 전달
 */
const getComments = async () => {
  try {
    const {data} = await repository.common.getTest({
      fetchOptions: {next: {revalidate: 60, tags: [COMMON_CACHE_TAG.TEST]}}
    });

    // [D] 응답 데이터 모델 밸리데이션
    Shared.zod.schemaValid({acName: 'acCommonGetTest', schema: TestSchema, data});

    return {data, fetchedAt: new Date().toISOString()};
  } catch (err) {
    // 외부 API 실패가 페이지 전체를 죽이지 않도록 에러 문구로 대체
    return {error: (err as Error).message};
  }
};

/** 서버 컴포넌트 XHR 테스트 */
const ServerComments = async () => {
  const result = await getComments();

  if ('error' in result) {
    return <p>조회 실패: {result.error}</p>;
  }

  return (
    <>
      <p>조회 시각: {result.fetchedAt}</p>
      <ul>
        {result.data.map((user) => (
          <li key={user.id}>이메일: {user.email}</li>
        ))}
      </ul>
    </>
  );
};

/** 테스트 페이지 */
const TestPage = () => {
  return (
    <>
      <h2>[테스트] 서버 컴포넌트 XHR (repository/server)</h2>
      <RefreshForm />
      <ServerComments />

      <hr />

      <h2>[테스트] 클라이언트 컴포넌트 XHR (repository/index)</h2>
      <ClientComments />

      <hr />

      <h2>[테스트] HTML 디코딩 문자열 XSS 공격 보호</h2>
      <SafeHTMLComponent
        tag="p"
        htmlContent={Shared.entities.decodeHTML('&lt;strong&gt;강조&lt;/strong&gt; &lt;a href=&quot;javascript:alert(1)&quot; onclick=&quot;alert(1)&quot;&gt;링크&lt;/a&gt;')}
      />
    </>
  );
};

export default TestPage;
