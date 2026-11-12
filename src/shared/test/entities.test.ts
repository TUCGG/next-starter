import * as Shared from '@/shared/index';
import {describe, expect, test} from 'vitest';

describe('[Unit 테스트] - 엔티티', () => {
  describe('[encodeHTML]', () => {
    test('특수문자를 HTML 엔티티로 이스케이프 처리', () => {
      // Given
      const text = `< > " ' & © ∆`;

      // When
      const result = Shared.entities.encodeHTML(text);

      // Then
      expect(result).toBe(`&lt; &gt; &quot; &apos; &amp; © ∆`);
    });

    test('비 ASCII 문자를 html5 레벨에서 네임드 엔티티로 인코딩', () => {
      // Given
      const text = `< ©`;

      // When
      const result = Shared.entities.encodeHTML(text, {mode: 'nonAsciiPrintable', level: 'html5'});

      // Then
      expect(result).toBe(`&lt; &copy;`);
    });

    test('비 ASCII 문자를 xml 레벨에서 숫자 엔티티로 인코딩', () => {
      // Given
      const text = `< ©`;

      // When
      const result = Shared.entities.encodeHTML(text, {mode: 'nonAsciiPrintable', level: 'xml'});

      // Then
      expect(result).toBe(`&lt; &#169;`);
    });
  });

  describe('[decodeHTML]', () => {
    test('대표적인 엔티티들을 실제 문자로 복원', () => {
      // Given
      const text = `&lt; &gt; &quot; &apos; &amp; &#169; &#8710;`;

      // When
      const result = Shared.entities.decodeHTML(text);

      // Then
      expect(result).toBe(`< > " ' & © ∆`);
    });

    test('html5 레벨 옵션에서는 &copy; 엔티티 복원', () => {
      // Given
      const text = '&copy;';

      // When
      const result = Shared.entities.decodeHTML(text, {level: 'html5'});

      // Then
      expect(result).toBe('©');
    });

    test('xml 레벨 옵션에서는 &copy; 그대로 유지', () => {
      // Given
      const text = '&copy;';

      // When
      const result = Shared.entities.decodeHTML(text, {level: 'xml'});

      // Then
      expect(result).toBe('&copy;');
    });
  });

  describe('[decodeHTMLEntity]', () => {
    test('단일 엔티티 토큰을 복원', () => {
      // Given
      const less = '&lt;';
      const nbspHex = '&#xA0;';

      // When
      const result1 = Shared.entities.decodeHTMLEntity(less);
      const result2 = Shared.entities.decodeHTMLEntity(nbspHex);

      // Then
      expect(result1).toBe('<');
      expect(result2).toBe('\u00A0');
    });

    test('알 수 없는 엔티티는 원본 그대로 반환', () => {
      // Given
      const unknown = '&notAnEntity;';

      // When
      const result = Shared.entities.decodeHTMLEntity(unknown);

      // Then
      expect(result).toBe('&notAnEntity;');
    });

    test('level 옵션 모드에 따라 디코드 처리', () => {
      // Given
      const copy = '&copy;';

      // When
      const html5 = Shared.entities.decodeHTMLEntity(copy, {level: 'html5'});
      const xml = Shared.entities.decodeHTMLEntity(copy, {level: 'xml'});

      // Then
      expect(html5).toBe('©');
      expect(xml).toBe('&copy;');
    });
  });
});
