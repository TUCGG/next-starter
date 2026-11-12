import type {Metadata} from 'next';
import {notFound, unstable_rethrow} from 'next/navigation';

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

    // 스키마 불일치는 로그만 남기지만, 렌더링이 의존하는 형태(배열)가 아니면 실패로 처리 (예: API_URL 오설정으로 200 HTML 응답)
    if (!Array.isArray(data)) {
      throw new Error('응답 형식이 올바르지 않습니다.');
    }

    return {data, fetchedAt: new Date().toISOString()};
  } catch (err) {
    // Next 내부 제어 에러(redirect, notFound, 동적 렌더링 신호 등)는 삼키지 않고 다시 던짐
    unstable_rethrow(err);

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
  // 운영 환경에서는 404 (빌드 시 운영 API 호출 방지, 요청 차단은 middleware 에서도 처리)
  if (process.env.NEXT_PUBLIC_NODE_ENV === 'production') {
    notFound();
  }

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
