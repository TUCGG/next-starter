import {config as loadEnv} from 'dotenv';
import type {NextConfig} from 'next';

// [D] APP_ENV 별 환경 변수 로드 (environment/.env.{APP_ENV}.local → .env 순서로 우선 적용)
// Next 기본 .env 로딩은 NODE_ENV 기준이라 qa 같은 환경을 구분할 수 없음
loadEnv({
  path: [`environment/.env.${process.env.APP_ENV ?? 'production'}.local`, '.env'],
  quiet: true
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false
};

export default nextConfig;
