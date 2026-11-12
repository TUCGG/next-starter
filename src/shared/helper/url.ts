/**
 * validOnlyRequiredSearchParams
 * @description URL 파라미터 중에 필수 파라미터만 포함하고 있고 추가적인 파라미터 없는지 유효 검증 체크 (어뷰징 방지)
 * @param requiredSearchParams
 * @param searchParams
 * @param exactMatch
 * @returns {boolean}
 *
 * @example
 * validOnlyRequiredSearchParams(['marketing', 'sms', 'email'], new URLSearchParams('marketing=y&sms=y&email=n'));
 */
export const validOnlyRequiredSearchParams = (requiredSearchParams: string[], searchParams: URLSearchParams, exactMatch: boolean = false) => {
  // 대소문자 구분 여부에 따라 파라미터를 정규화하는 함수
  const normalizeParam = (param: string) => (exactMatch ? param : param.toLowerCase());

  // 필수 파라미터를 정규화
  // (정규화된 필수 파라미터 배열을 생성합니다. 대소문자 구분 여부는 exact 플래그에 따라 결정)
  const normalizedRequiredParams = requiredSearchParams.map((param) => normalizeParam(param));

  // 검색 파라미터를 정규화하여 Map에 저장
  const normalizedSearchParams = new Map<string, string>();

  // (검색 파라미터의 모든 키를 정규화하고, 정규화된 키와 값을 Map에 저장)
  for (const [key, value] of searchParams.entries()) {
    normalizedSearchParams.set(normalizeParam(key), value);
  }

  // 필수 파라미터 요청인지 체크
  // (정규화된 필수 파라미터가 검색 파라미터의 Map에 모두 존재하는지 체크)
  for (const param of normalizedRequiredParams) {
    if (!normalizedSearchParams.has(param)) {
      return false;
    }
  }

  // 추가 파라미터가 없는지 체크 (어뷰징 방지)
  // (정규화된 검색 파라미터에 포함된 모든 키가 필수 파라미터 목록에 포함되어 있는지 체크)
  for (const key of normalizedSearchParams.keys()) {
    if (!normalizedRequiredParams.includes(key)) {
      return false;
    }
  }

  return true;
};

/**
 * getSearchParamValue
 * @description URL 파라미터 대소문자 구분 없이 조회 후 값 반환
 * @param param
 *
 * @example
 * // window.location.search = '?foo=bar';
 * getSearchParamValue('baz'); // true
 */
export const getSearchParamValue = (param: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  const lowerCaseParam = param.toLowerCase();
  const keyName = Array.from(searchParams.keys()).find((key) => key.toLowerCase() === lowerCaseParam);

  return searchParams.has(keyName as string) ? searchParams.get(keyName as string) : null;
};

/**
 * getQuery
 * @description URL 쿼리 문자열을 객체로 반환
 * @param query - 쿼리 문자열
 * @returns 객체
 *
 * @example
 * // 'https://example.com/page?foo=bar&baz=qux' or '?name=bar&age=qux'
 * getQuery(query); // {foo: 'bar', baz: 'qux'}
 */
export const getQuery = (query: string): Record<string, string> => {
  const BLOCKED_QUERY_KEYS = new Set(['__proto__', 'prototype', 'constructor']); // 객체 key로 쓰면 위험할 수 있는 쿼리 네이밍 차단
  const queryString = query.startsWith('?') ? query.substring(1) : new URL(query).search.substring(1);

  return Object.fromEntries([...new URLSearchParams(queryString)].filter(([key]) => !BLOCKED_QUERY_KEYS.has(key)));
};

/**
 * setQuery
 * @description 객체를 URL 쿼리 문자열 변환
 * @param query - 객체
 * @returns URL 쿼리 문자열
 *
 * @example
 * setQuery({name: 'John', age: '30'}); // 'name=John&age=30'
 */
export const setQuery = (query: Record<string, string>) => {
  const params = new URLSearchParams(query).toString();

  return params ? `${params}` : null;
};

/**
 * setQueryItem
 * @description URL 쿼리 문자열 형태로 인코딩 변환
 * @param key - 쿼리 키
 * @param value - 문자열 값 또는 배열 형태의 값
 * @returns URL 쿼리 문자열
 *
 * @example
 * setQueryItem('name', 'John Doe'); // 'name=John%20Doe'
 */
export const setQueryItem = (key: string, value: string | string[]) => {
  return Array.isArray(value) ? value.map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`).join('&') : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
};
