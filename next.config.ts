import {config as loadEnv} from 'dotenv';
import type {NextConfig} from 'next';

const APP_ENV = process.env.APP_ENV ?? 'production';

// [D] APP_ENV 별 환경 변수 로드 - 먼저 읽은 값이 우선 (환경별 → 시크릿 → 공통), 이미 설정된 시스템 환경 변수는 덮어쓰지 않음
// 공통 파일을 루트 .env 로 두면 Next가 먼저 자동 로드해서 환경별 값보다 우선하게 되므로 environment/.env 에 둠
loadEnv({
  path: [
    `environment/.env.${APP_ENV}.local`, // 환경별
    `environment/secrets/.env.secret.${APP_ENV}.local`, // 시크릿 (git 제외, 없으면 건너뜀)
    'environment/.env' // 공통
  ],
  quiet: true
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // lint는 npm run lint / pre-push 에서 별도 실행 (Next 16은 빌드 시 lint 자체가 제거됨)
  eslint: {ignoreDuringBuilds: true}
};

export default nextConfig;
