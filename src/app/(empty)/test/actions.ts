'use server';

import {revalidateTag} from 'next/cache';

import {COMMON_CACHE_TAG} from '@/repository/common.repository';

/** 서버 캐시 무효화 → 현재 페이지 서버 컴포넌트 재조회 */
export const refreshComments = async () => {
  revalidateTag(COMMON_CACHE_TAG.TEST);
};
