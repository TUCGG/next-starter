import type {Metadata} from 'next';
import React from 'react';

/** 문서 HEAD (react-starter HeadComponent 대체) */
export const metadata: Metadata = {
  title: {
    default: process.env.NEXT_PUBLIC_APP_TITLE,
    template: `%s :: ${process.env.NEXT_PUBLIC_APP_TITLE}`
  },
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  keywords: process.env.NEXT_PUBLIC_APP_KEYWORDS
  // openGraph: {url: 'https://example.com'},
};

const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
