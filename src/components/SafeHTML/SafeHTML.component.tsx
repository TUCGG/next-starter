'use client';

import React, {type ElementType, type FC} from 'react';

import DOMPurify, {Config} from 'dompurify';

import {useIsMounted} from '@/hooks/index';

/** Props 타입 정의 */
interface ISafeHTMLComponentProps {
  tag?: ElementType | null;
  htmlContent: string;
  options?: Config;
}

/**
 * SafeHTMLComponent
 * @description React > dangerouslySetInnerHTML 속성 보안 강화 (XSS 공격 방지)
 * @param props
 * @constructor
 * @see https://github.com/cure53/DOMPurify
 *
 * @example
 * <SafeHTMLComponent
 *   tag="p"
 *   htmlContent={`
 *    <h1>Welcome</h1>
 *    <p>This is a paragraph with <strong>bold</strong> text.</p>
 *    <a href="https://example.com">Visit Example</a>
 *    <img src=x onerror=alert(1)//>
 *    <script>alert('XSS Attack!');</script> // 이 스크립트는 DOMPurify 에 의해 제거
 *  `}
 * />
 */
const SafeHTMLComponent: FC<ISafeHTMLComponentProps> = (props) => {
  const isMounted = useIsMounted();

  // shortcut: DOMPurify는 DOM이 필요해서 서버 렌더링(SSR) 결과에는 포함되지 않음, SEO가 필요하면 isomorphic-dompurify로 교체
  if (!isMounted) {
    return null;
  }

  // DOMPurify 사용하여 순수 문자열만 추출
  if (props.tag === null) {
    const cleanText = DOMPurify.sanitize(props.htmlContent, {
      ALLOWED_TAGS: [], // 태그 전부 제거
      ALLOWED_ATTR: [] // 속성 전부 제거
    });

    return <>{cleanText}</>;
  }

  // DOMPurify 사용하여 HTML 정화
  const cleanHTML = props.options
    ? DOMPurify.sanitize(props.htmlContent, props.options) // 허용 목록 및 차단 목록 제어
    : DOMPurify.sanitize(props.htmlContent); // 기본

  return React.createElement(props.tag ?? 'div', {
    dangerouslySetInnerHTML: {__html: cleanHTML}
  });
};

export default SafeHTMLComponent;
