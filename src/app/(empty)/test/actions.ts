'use server';

import {updateTag} from 'next/cache';

import {COMMON_CACHE_TAG} from '@/repository/common.repository';

/** 서버 캐시 무효화 → 현재 페이지 서버 컴포넌트 재조회 (updateTag: Server Action 전용, 즉시 만료) */
export const refreshComments = async () => {
  updateTag(COMMON_CACHE_TAG.TEST);
};
