'use client';

import {useEffect} from 'react';

// https://nextjs.org/docs/app/api-reference/file-conventions/error
// 페이지 단위 에러 경계 (레이아웃은 유지, 처리되지 않으면 global-error 로 전파)

const PageError = ({error, reset}: {error: Error & {digest?: string}; reset: () => void}) => {
  useEffect(() => {
    console.error('[PAGE ERROR]', error);
  }, [error]);

  return (
    <>
      <h1>페이지를 표시하는 중 오류가 발생했습니다.</h1>
      <button type="button" onClick={() => reset()}>
        다시 시도
      </button>
    </>
  );
};

export default PageError;
