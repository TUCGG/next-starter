import {type DecodeOptions, type EncodeOptions, type Level, decode, decodeEntity, encode} from 'html-entities';

interface ICommonOptions {
  level?: Level;
}

/**
 * encodeHTML
 * @description HTML 엔티티 이스케이프 &, <, >, ", ' 등 특수문자를 HTML 엔티티로 변환
 * @param {string | undefined | null} text - 원본 문자열
 * @param {EncodeOptions} [options] - 인코딩 옵션
 * @returns {string} 엔티티로 변환된 문자열 반환
 *
 * @example
 * encodeHTML('< > " \' & © ∆'); // '&lt; &gt; &quot; &apos; &amp; © ∆'
 * encodeHTML('< ©', {mode: 'nonAsciiPrintable'}); // '&lt; &copy;'
 * encodeHTML('< ©', {mode: 'nonAsciiPrintable', level: 'xml'}); // '&lt; &#169;'
 * encodeHTML('< ©', '< > " \' & ©', {mode: 'nonAsciiPrintableOnly', level: 'xml'}); // '< > " \' & &#169;'
 */
export const encodeHTML = (text: string | undefined | null, options?: EncodeOptions) => encode(text, options);

/**
 * decodeHTML
 * @description HTML 엔티티 &lt;, &gt;, &amp; 등 코드를 실제 문자로 복원
 * @param {string | undefined | null} text - 엔티티가 포함된 문자열
 * @param {EncodeOptions} [options] - 디코딩 옵션
 * @returns {string} 디코드된 문자열 반환
 *
 * @example
 * decodeHTML('&lt; &gt; &quot; &apos; &amp; &#169; &#8710;'); // '< > " \' & © ∆'
 * decodeHTML('&copy;', {level: 'html5'}); // '©'
 * decodeHTML('&copy;', {level: 'xml'}); // '&copy;'
 */
export const decodeHTML = (text: string | undefined | null, options?: DecodeOptions) => decode(text, options);

/**
 * decodeHTMLEntity
 * @description 단일 HTML 엔티티를 디코드 처리 (알 수 없는 엔티티는 그대로 유지)
 * @param {string | undefined | null} entity - 단일 엔티티 문자열
 * @param {ICommonOptions} [options] - 옵션
 * @returns {string} 디코드된 문자 (또는 원문)
 *
 * @example
 * decodeHTMLEntity('&lt;'); // '<'
 * decodeHTMLEntity('&copy;', {level: 'html5'}); // '©'
 * decodeHTMLEntity('&copy;', {level: 'xml'}); // '&copy;'
 */
export const decodeHTMLEntity = (entity: string | undefined | null, options?: ICommonOptions) => decodeEntity(entity, options);
