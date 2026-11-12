import * as Shared from '@/shared/index';
import {afterEach, beforeEach, describe, expect, test} from 'vitest';

describe('[Unit 테스트] - url', () => {
  describe('[validOnlyRequiredSearchParams]', () => {
    test.each([
      ['유효한 케이스', 'marketing=y&sms=y&email=n', true],
      ['어뷰징 케이스 - 필수 파라미터 누락', 'marketing=y&sms=y', false],
      ['어뷰징 케이스 - 임의의 파라미터 추가', 'marketing=y&sms=y&email=n&test=y', false]
    ])('URL 파라미터 체크 > %s', (_, query, expected) => {
      // Given
      const requiredSearchParams = ['marketing', 'sms', 'email'];
      const searchParams = new URLSearchParams(query);

      // Then
      expect(Shared.url.validOnlyRequiredSearchParams(requiredSearchParams, searchParams)).toBe(expected);
    });
  });

  describe('[getSearchParamValue]', () => {
    const originalLocation = window.location;

    beforeEach(() => {
      // window.location.search를 조작하기 위한 가짜 객체 생성
      delete (window as any).location;

      (window as any).location = {
        search: ''
      };
    });

    afterEach(() => {
      // 테스트 후 원래의 window.location으로 복원
      (window as any).location = originalLocation;
    });

    test('param 매개변수를 찾을 수 없으면 null 반환', () => {
      // Given
      window.location.search = '?foo=bar';

      // When

      // Then
      expect(Shared.url.getSearchParamValue('baz')).toBeNull();
    });

    test('param 매개변수가 존재하면 해당 값을 반환', () => {
      // Given
      window.location.search = '?foo=bar';

      // When

      // Then
      expect(Shared.url.getSearchParamValue('foo')).toBe('bar');
    });

    test('대소문자 구분없이 param 매개변수가 존재하면 해당 값을 반환', () => {
      // Given
      window.location.search = '?foo=bar';

      // When

      // Then
      expect(Shared.url.getSearchParamValue('Foo')).toBe('bar');
    });
  });

  describe('[getQuery]', () => {
    test('전체 URL 문자열을 전달한 경우 쿼리 부분만 객체 반환', () => {
      // Given
      const query = 'https://example.com/page?foo=bar&baz=qux';

      // When

      // Then
      expect(Shared.url.getQuery(query)).toEqual({foo: 'bar', baz: 'qux'});
    });

    test('쿼리 문자열이 "?"로 시작하는 경우 객체 반환', () => {
      // Given
      const query = '?name=John&age=30';

      // When

      // Then
      expect(Shared.url.getQuery(query)).toEqual({name: 'John', age: '30'});
    });

    test('쿼리 문자열이 없는 경우 빈 객체 반환', () => {
      // Given
      const query = 'https://example.com/page';

      // When

      // Then
      expect(Shared.url.getQuery(query)).toEqual({});
    });

    test('쿼리값이 URL 인코딩된 경우 디코딩된 값으로 객체 반환', () => {
      // Given
      const query = '?keyword=%ED%95%9C%EA%B8%80';

      // When

      // Then
      expect(Shared.url.getQuery(query)).toEqual({keyword: '한글'});
    });
  });

  describe('[setQuery]', () => {
    test('객체를 쿼리 문자열로 변환', () => {
      // Given
      const query = {name: 'John', age: '30'};

      // When

      // Then
      expect(Shared.url.setQuery(query)).toBe('name=John&age=30');
    });

    test('객체가 빈 경우 null 반환', () => {
      // Given
      const query = {};

      // When

      // Then
      expect(Shared.url.setQuery(query)).toBeNull();
    });

    test('한글이나 특수문자가 포함된 값인 경우 인코딩 처리', () => {
      // Given
      const query = {keyword: '한글', symbol: '@test!'};

      // When

      // Then
      expect(Shared.url.setQuery(query)).toBe(`keyword=%ED%95%9C%EA%B8%80&symbol=%40test%21`);
    });

    test('값에 공백이 포함된 경우 + 또는 %20 으로 인코딩 처리', () => {
      // Given
      const query = {q: 'hello world'};

      // When

      // Then
      expect(Shared.url.setQuery(query)).toBe('q=hello+world');
    });
  });

  describe('[setQueryItem]', () => {
    test('단일 문자열 값인 경우 쿼리 문자열로 변환', () => {
      // Given

      // When

      // Then
      expect(Shared.url.setQueryItem('name', 'John Doe')).toBe('name=John%20Doe');
    });

    test('한글이 포함된 값인 경우 인코딩 처리', () => {
      // Given

      // When

      // Then
      expect(Shared.url.setQueryItem('keyword', '검색어')).toBe('keyword=%EA%B2%80%EC%83%89%EC%96%B4');
    });

    test('배열 값인 경우 여러 쿼리 문자열로 변환', () => {
      // Given

      // When

      // Then
      expect(Shared.url.setQueryItem('color', ['red', 'blue', 'green'])).toBe('color=red&color=blue&color=green');
    });

    test('특수문자 값인 경우 인코딩 처리', () => {
      // Given

      // When

      // Then
      expect(Shared.url.setQueryItem('token', 'a&b=c')).toBe('token=a%26b%3Dc');
    });

    test('빈 문자열인 경우 정상 처리', () => {
      // Given

      // When

      // Then
      expect(Shared.url.setQueryItem('empty', '')).toBe('empty=');
    });

    test('빈 배열은 빈 문자열을 반환', () => {
      // Given

      // When

      // Then
      expect(Shared.url.setQueryItem('tags', [])).toBe('');
    });
  });
});
