import React from 'react';

/** AppLayout - 공통 레이아웃 (헤더, 푸터 등) */
const AppLayout = ({children}: {children: React.ReactNode}) => {
  return <div id="wrap">{children}</div>;
};

export default AppLayout;
