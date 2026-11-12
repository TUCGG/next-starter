/**
 * comma
 * @description 천단위 콤마 추가
 * @param value - 숫자 값
 * @param lang - 언어 (navigator.language)
 * @param options - 옵션
 * @returns string
 *
 * @example
 * comma(1000);
 */
export const comma = (value: number, lang: string = 'ko-KR', options = {}) => {
  const formatter = new Intl.NumberFormat(lang, options);

  return formatter.format(value);
};

/**
 * uncomma
 * @description 천단위 콤마 제거
 * @param value - 숫자 값
 * @returns string
 *
 * @example
 * uncomma('1,000');
 */
export const uncomma = (value: string) => value.toString().replaceAll(/[^\d]+/g, '');

// /**
//  * currency
//  * @description 통화 포맷
//  * @param value - 숫자 값
//  * @param lang - 언어
//  * @param options - 옵션
//  * @returns string
//  *
//  * @example
//  * currency(1000, {currency: 'usd'});
//  */
// export const currency = (value: number, lang = navigator.language, options = {}) => {
//   const formatter = new Intl.NumberFormat(lang, {
//     style: 'currency',
//     // currency: 'krw', // usd, jpy, eur, ...
//     // notation: 'compact',
//     ...options
//   });
//
//   return formatter.format(value);
// };

/**
 * @method strEllipsis
 * @description 텍스트 문자열 말줄임
 * @param txt - 텍스트
 * @param len - 말줄임 처리할 문자열 길이
 * @returns string
 */
export const strEllipsis = (txt: string, len: number = 10) => {
  if (txt.length > len) {
    txt = txt.substring(0, len) + '...';
  }

  return txt;
};
