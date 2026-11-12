/**
 * @method hasWhitespace
 * @description 공백 여부 체크
 * @param {string} txt - 텍스트
 * @returns {boolean}
 *
 * @example
 * hasWhitespace('abcd efgh'); // true
 */
export const hasWhitespace = (txt: string): boolean => {
  const regex = /\s/;

  return regex.test(txt);
};

/**
 * @method hasSpecialCharacters
 * @description 특수기호 여부 체크
 * @param {string} txt - 텍스트
 * @returns {boolean}
 *
 * @example
 * hasSpecialCharacters('abab'); // false
 */
export const hasSpecialCharacters = (txt: string): boolean => {
  const regex = /[~!@#$%^&*()_+=[\]{};':"\\|,.<>/?]+/;

  return regex.test(txt);
};

/**
 * @method hasKoreanCharacters
 * @description 한글 여부 체크
 * @param {string} txt - 텍스트
 * @returns {boolean}
 *
 * @example
 * hasKoreanCharacters('ㄱㄴㄷㄹㅁㅂㅅ'); // true
 */
export const hasKoreanCharacters = (txt: string): boolean => {
  const regex = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;

  return regex.test(txt);
};

/**
 * @method hasChineseCharacters
 * @description 한자 여부 체크
 * @param {string} txt - 텍스트
 * @returns {boolean}
 *
 * @example
 * hasChineseCharacters('中國語'); // true
 */
export const hasChineseCharacters = (txt: string): boolean => {
  const regex = /[\u4E00-\u9FFF\u3400-\u4DBF]/;

  return regex.test(txt);
};

/**
 * @method isEmptyInput
 * @description 미입력 여부 체크
 * @param {string} txt - 텍스트
 * @returns {boolean}
 *
 * @example
 * isEmptyInput(''); // true
 */
export const isEmptyInput = (txt: string): boolean => {
  return txt.trim().length === 0;
};

/**
 * @method isNumericOnly
 * @description 숫자 여부 체크
 * @param {string | number} txt - 텍스트
 * @returns {boolean}
 *
 * @example
 * isNumericOnly(12345); // true
 */
export const isNumericOnly = (txt: string | number): boolean => {
  const regex = /^\d+$/;

  return regex.test(txt.toString());
};

/**
 * @method isValidEmail
 * @description 이메일 형식 체크
 * @param {string} txt - 텍스트
 * @returns {boolean}
 *
 * @example
 * isValidEmail('abcd@abcd.com'); // true
 */
export const isValidEmail = (txt: string): boolean => {
  // ReDoS 위험 완화를 위해 이메일 최대 길이 제한
  if (txt.length > 254) {
    return false;
  }

  // eslint-disable-next-line security/detect-unsafe-regex, sonarjs/slow-regex
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  return regex.test(txt);
};

/**
 * isRepeatingChars
 * @description 동일한 텍스트 연속 사용 체크
 * @param {string} txt - 텍스트
 * @param {number} len - 제한 자리수
 * @returns {boolean}
 *
 * @example
 * isRepeatingChars('121', 1); // true
 */
export const isRepeatingChars = (txt: string, len: number): boolean => {
  if (/[\r\n]/.test(txt)) {
    return false;
  }

  if (len < 1) {
    return false;
  }

  if (len === 1) {
    return true;
  }

  for (let i = 1, count = 1; i < txt.length; i += 1) {
    count = txt.charAt(i) === txt.charAt(i - 1) ? count + 1 : 1;

    if (count >= len) {
      return true;
    }
  }

  return false;
};

/**
 * isStringLengthOnly
 * @description 문자열 자릿 수 체크
 * @param {string} txt - 텍스트
 * @param {number} len - 제한 자리수
 * @returns {boolean}
 *
 * @example
 * isStringLengthOnly('a', 1); // true
 */
export const isStringLengthOnly = (txt: string, len: number): boolean => {
  if (/[\r\n]/.test(txt)) {
    return false;
  }

  return Array.from(txt).length === len;
};

/**
 * isZeroOnly
 * @description 문자열에 0만 있는 지 체크
 * @param {string} txt - 텍스트
 * @returns {boolean}
 *
 * @example
 * isZeroOnly('0'); // true
 */
export const isZeroOnly = (txt: string): boolean => {
  const regex = new RegExp(/^0*$/);

  return regex.test(txt);
};

export default {
  hasWhitespace,
  hasSpecialCharacters,
  hasKoreanCharacters,
  hasChineseCharacters,
  isEmptyInput,
  isNumericOnly,
  isValidEmail,
  isRepeatingChars,
  isStringLengthOnly,
  isZeroOnly
};
