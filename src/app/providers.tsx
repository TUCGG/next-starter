'use client';

import React from 'react';

import * as Shared from '@/shared/index';

import AppContextProviders from '@/context/index';

// React Developer Tools 애드온 비활성화 (브라우저 + 프로덕션)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  Shared.addon.disableReactDevTools();
}

/** Providers - 전역 클라이언트 프로바이더 (Context 등) */
const Providers = ({children}: {children: React.ReactNode}) => {
  return <AppContextProviders>{children}</AppContextProviders>;
};

export default Providers;
