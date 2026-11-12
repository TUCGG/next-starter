import {act} from 'react';
import {createRoot} from 'react-dom/client';
import {describe, expect, test} from 'vitest';

import {SafeHTMLComponent} from '@/components/index';

(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

describe('[Unit 테스트] - SafeHTMLComponent (브라우저)', () => {
  test('마운트 후 위험한 속성을 제거한 HTML을 렌더한다', async () => {
    const container = document.createElement('div');
    const root = createRoot(container);

    await act(async () => {
      root.render(<SafeHTMLComponent tag="p" htmlContent="<b>hi</b><img src=x onerror=alert(1)>" />);
    });

    expect(container.innerHTML).toBe('<p><b>hi</b><img src="x"></p>');
    root.unmount();
  });
});
