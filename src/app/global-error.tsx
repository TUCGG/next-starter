'use client';

import {useEffect} from 'react';

// https://nextjs.org/docs/app/api-reference/file-conventions/error#global-error

const GlobalError = ({error, reset}: {error: Error & {digest?: string}; reset: () => void}) => {
  useEffect(() => {
    console.error('[GLOBAL ERROR]', error);
    // window.location.replace(process.env.NEXT_PUBLIC_STATIC_PAGE_INTERNAL_SERVER_ERROR);
  }, [error]);

  return (
    <html lang="ko">
      <body>
        <h1>오류가 발생했습니다.</h1>
        <button type="button" onClick={() => reset()}>
          다시 시도
        </button>
      </body>
    </html>
  );
};

export default GlobalError;
