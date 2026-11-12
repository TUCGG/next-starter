import {type NextRequest, NextResponse} from 'next/server';

/**
 * proxy
 * @description 요청 가로채기 (인증 체크, 리다이렉트, 헤더 추가 등) - Next 15 middleware.ts 대체, Node.js 런타임
 * @see https://nextjs.org/docs/app/getting-started/proxy
 */
export function proxy(request: NextRequest) {
  // [D] 테스트 페이지는 운영 환경에서 차단 (404)
  if (process.env.NEXT_PUBLIC_NODE_ENV === 'production' && request.nextUrl.pathname.startsWith('/test')) {
    return NextResponse.rewrite(new URL('/not-found', request.url));
  }

  // [D] 인증이 필요한 경로 접근 시 로그인 페이지로 이동 (matcher 에 경로 추가)
  // const accessToken = request.cookies.get('accessToken')?.value;
  //
  // if (!accessToken && request.nextUrl.pathname.startsWith('/mypage')) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/test/:path*']
};
