import {config as loadEnv} from 'dotenv';
import type {NextConfig} from 'next';
import {existsSync} from 'node:fs';

const APP_ENV = process.env.APP_ENV ?? 'production';
const APP_ENV_FILE = `environment/.env.${APP_ENV}.local`;

// APP_ENV 오타/빈 값이면 환경 변수 없이 빌드되므로 즉시 실패
if (!existsSync(APP_ENV_FILE)) {
  throw new Error(`[env] ${APP_ENV_FILE} 파일이 없습니다. APP_ENV("${APP_ENV}") 값을 확인하세요. (development | qa | production)`);
}

// [D] APP_ENV 별 환경 변수 로드 - 먼저 읽은 값이 우선 (환경별 → 시크릿 → 공통), 이미 설정된 시스템 환경 변수는 덮어쓰지 않음
// 공통 파일을 루트 .env 로 두면 Next가 먼저 자동 로드해서 환경별 값보다 우선하게 되므로 environment/.env 에 둠
loadEnv({
  path: [
    APP_ENV_FILE, // 환경별
    `environment/secrets/.env.secret.${APP_ENV}.local`, // 시크릿 (git 제외, 없으면 건너뜀)
    'environment/.env' // 공통
  ],
  quiet: true
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Cache Components ("use cache" / cacheLife / cacheTag) - 다음 메이저에서 기본값이 되며 옵션 제거 예정
  cacheComponents: true,
  partialPrefetching: true
};

export default nextConfig;
