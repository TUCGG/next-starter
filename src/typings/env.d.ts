/**
 * ProcessEnv
 * @description 환경 변수 타입 정의 (.env, environment/.env.{APP_ENV}.local)
 */
declare namespace NodeJS {
  interface ProcessEnv {
    readonly APP_ENV?: 'development' | 'qa' | 'production';

    // ### 문서 > HEAD
    readonly NEXT_PUBLIC_APP_TITLE: string;
    readonly NEXT_PUBLIC_APP_DESCRIPTION: string;
    readonly NEXT_PUBLIC_APP_KEYWORDS: string;

    // ### 도메인
    readonly NEXT_PUBLIC_DOMAIN: string;
    readonly NEXT_PUBLIC_NODE_ENV: string;
    readonly NEXT_PUBLIC_BASE_URL: string;

    // ### STATIC PAGE
    readonly NEXT_PUBLIC_STATIC_PAGE_NOT_FOUND: string;
    readonly NEXT_PUBLIC_STATIC_PAGE_INTERNAL_SERVER_ERROR: string;

    // ### REST API
    readonly NEXT_PUBLIC_API_URL: string; // 브라우저
    readonly API_URL: string; // 서버 전용
  }
}
