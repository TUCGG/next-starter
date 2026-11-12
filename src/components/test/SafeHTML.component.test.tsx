// @vitest-environment node
import {renderToString} from 'react-dom/server';
import {describe, expect, test} from 'vitest';

import {SafeHTMLComponent} from '@/components/index';

describe('[Unit 테스트] - SafeHTMLComponent', () => {
  test('DOM이 없는 서버 렌더링에서 에러 없이 빈 결과를 반환한다', () => {
    const html = renderToString(<SafeHTMLComponent htmlContent="<b>hi</b><img src=x onerror=alert(1)>" />);

    expect(html).toBe('');
  });
});
