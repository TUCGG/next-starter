import * as Shared from '@/shared/index';
import {describe, expect, test} from 'vitest';

describe('[Unit 테스트] - 밸리데이션', () => {
  test('hasWhitespace - 공백 포함 여부 체크 - Truthy Case', () => {
    // Given
    const case1 = Shared.validation.hasWhitespace('abcd efgh');
    const case2 = Shared.validation.hasWhitespace('    aaaaa');
    const case3 = Shared.validation.hasWhitespace('ab ');
    const case4 = Shared.validation.hasWhitespace('\n\n');
    const case5 = Shared.validation.hasWhitespace('\r\n');
    const case6 = Shared.validation.hasWhitespace('\t');
    const case7 = Shared.validation.hasWhitespace('\v');
    const case8 = Shared.validation.hasWhitespace('\f');
    const case9 = Shared.validation.hasWhitespace('ab\nab');

    // When

    // Then
    expect(case1).toBeTruthy();
    expect(case2).toBeTruthy();
    expect(case3).toBeTruthy();
    expect(case4).toBeTruthy();
    expect(case5).toBeTruthy();
    expect(case6).toBeTruthy();
    expect(case7).toBeTruthy();
    expect(case8).toBeTruthy();
    expect(case9).toBeTruthy();
  });

  test('hasWhitespace - 공백 포함 여부 체크 - Falsy Case', () => {
    // Given
    const case1 = Shared.validation.hasWhitespace('abab');
    const case2 = Shared.validation.hasWhitespace('cdcd');
    const case3 = Shared.validation.hasWhitespace('__!__!_!');
    const case4 = Shared.validation.hasWhitespace('');
    const case5 = Shared.validation.hasWhitespace('1');

    // When

    // Then
    expect(case1).toBeFalsy();
    expect(case2).toBeFalsy();
    expect(case3).toBeFalsy();
    expect(case4).toBeFalsy();
    expect(case5).toBeFalsy();
  });

  test('hasSpecialCharacters - 특수문자 포함 여부 체크 - Truthy Case', () => {
    // Given
    const case1 = Shared.validation.hasSpecialCharacters('abcd!');
    const case2 = Shared.validation.hasSpecialCharacters('abcd+');
    const case3 = Shared.validation.hasSpecialCharacters('!@#$%^^');
    const case4 = Shared.validation.hasSpecialCharacters('/,.,');
    const case5 = Shared.validation.hasSpecialCharacters('/w+/');
    const case6 = Shared.validation.hasSpecialCharacters('@');
    const case7 = Shared.validation.hasSpecialCharacters('(｡♥‿♥｡) 사랑에 빠졌어요');
    const case8 = Shared.validation.hasSpecialCharacters('(`Д´)ゞ 충성!');

    // When

    // Then
    expect(case1).toBeTruthy();
    expect(case2).toBeTruthy();
    expect(case3).toBeTruthy();
    expect(case4).toBeTruthy();
    expect(case5).toBeTruthy();
    expect(case6).toBeTruthy();
    expect(case7).toBeTruthy();
    expect(case8).toBeTruthy();
  });

  test('hasSpecialCharacters - 특수문자 포함 여부 체크 - Falsy Case', () => {
    // Given
    const case1 = Shared.validation.hasSpecialCharacters('abcd1234');
    const case2 = Shared.validation.hasSpecialCharacters('Hello World');
    const case3 = Shared.validation.hasSpecialCharacters('千字文');
    const case4 = Shared.validation.hasSpecialCharacters('นะมุวิคิ ต้นไม้แห่งความรู้ที่ทุกท่านปลูก');
    const case5 = Shared.validation.hasSpecialCharacters(' ');
    const case6 = Shared.validation.hasSpecialCharacters('\n');
    const case7 = Shared.validation.hasSpecialCharacters('🐹ྀི');
    // const case8 = hasSpecialCharacters(null);
    // const case9 = hasSpecialCharacters(undefined);
    // const case10 = hasSpecialCharacters(0);
    // const case11 = hasSpecialCharacters(false);

    // When

    // Then
    expect(case1).toBeFalsy();
    expect(case2).toBeFalsy();
    expect(case3).toBeFalsy();
    expect(case4).toBeFalsy();
    expect(case5).toBeFalsy();
    expect(case6).toBeFalsy();
    expect(case7).toBeFalsy();
    // expect(case8).toBeFalsy();
    // expect(case9).toBeFalsy();
    // expect(case10).toBeFalsy();
    // expect(case11).toBeFalsy();
  });

  test('hasKoreanCharacters - 한국어 포함 여부 체크 - Truthy Case', () => {
    // Given
    const case1 = Shared.validation.hasKoreanCharacters('ㄱㄴㄷㄹㅁㅂㅅ');
    const case2 = Shared.validation.hasKoreanCharacters('abcd bbb  t       a cccc ㄱ sss ababa');
    const case3 = Shared.validation.hasKoreanCharacters('          ㅏㅑㅓㅕ        ');
    const case4 = Shared.validation.hasKoreanCharacters('가나다라마바사');
    const case5 = Shared.validation.hasKoreanCharacters(' ต้นไม้แห่งความรู้ที่ทุกท่านปลูก  ㅁ ต้นไม้แห่งความรู้ที่ทุกท่านปลูก');
    const case6 = Shared.validation.hasKoreanCharacters(' 千字文 千字文  千字文 천자문 1000words');
    const case7 = Shared.validation.hasKoreanCharacters('🐹ྀི🐹ྀི가나다라🐹ྀི🐹ྀི');
    const case8 = Shared.validation.hasKoreanCharacters('하하 ');

    // When

    // Then
    expect(case1).toBeTruthy();
    expect(case2).toBeTruthy();
    expect(case3).toBeTruthy();
    expect(case4).toBeTruthy();
    expect(case5).toBeTruthy();
    expect(case6).toBeTruthy();
    expect(case7).toBeTruthy();
    expect(case8).toBeTruthy();
  });

  test('hasKoreanCharacters - 한국어 포함 여부 체크 - Falsty Case', () => {
    // Given
    const case1 = Shared.validation.hasKoreanCharacters('abcdefg');
    const case2 = Shared.validation.hasKoreanCharacters('ต้นไม้แห่งความรู้ที่ทุกท่านปลูก');
    const case3 = Shared.validation.hasKoreanCharacters('千字文');
    const case4 = Shared.validation.hasKoreanCharacters('  ');
    // const case5 = hasKoreanCharacters(null);
    // const case6 = hasKoreanCharacters(undefined);
    // const case7 = hasKoreanCharacters(0);
    // const case8 = hasKoreanCharacters(true);

    // When

    // Then
    expect(case1).toBeFalsy();
    expect(case2).toBeFalsy();
    expect(case3).toBeFalsy();
    expect(case4).toBeFalsy();
    // expect(case5).toBeFalsy();
    // expect(case6).toBeFalsy();
    // expect(case7).toBeFalsy();
    // expect(case8).toBeFalsy();
  });

  test('hasChineseCharacters - 중국어 포함 여부 체크 - Truthy Case', () => {
    // Given
    const case1 = Shared.validation.hasChineseCharacters('中國語');
    const case2 = Shared.validation.hasChineseCharacters('中   國  語 ');
    const case3 = Shared.validation.hasChineseCharacters('가나다라 語 마바사아');
    const case4 = Shared.validation.hasChineseCharacters('abcd efgh 中國語 hijk');
    const case5 = Shared.validation.hasChineseCharacters('!@#$%@%中國語');
    const case6 = Shared.validation.hasChineseCharacters('          中國語              ');
    const case7 = Shared.validation.hasChineseCharacters('ต้นไม้แห่งความรู้ที่ทุ中 中กท่านปลูก');
    const case8 = Shared.validation.hasChineseCharacters('\n\n\n我愛她\n\n\n');

    // When

    // Then
    expect(case1).toBeTruthy();
    expect(case2).toBeTruthy();
    expect(case3).toBeTruthy();
    expect(case4).toBeTruthy();
    expect(case5).toBeTruthy();
    expect(case6).toBeTruthy();
    expect(case7).toBeTruthy();
    expect(case8).toBeTruthy();
  });

  test('hasChineseCharacters - 중국어 포함 여부 체크 - Falsy Case', () => {
    // Given
    const case1 = Shared.validation.hasChineseCharacters('abcd');
    const case2 = Shared.validation.hasChineseCharacters('가나다라');
    const case3 = Shared.validation.hasChineseCharacters('ต้นไม้แห่งความรู้ที่ทุ');
    // const case4 = Shared.validation.hasChineseCharacters(null);
    // const case5 = Shared.validation.hasChineseCharacters(undefined);
    // const case6 = Shared.validation.hasChineseCharacters(2000);
    // const case7 = Shared.validation.hasChineseCharacters(true);
    // const case8 = Shared.validation.hasChineseCharacters(false);
    const case9 = Shared.validation.hasChineseCharacters('');

    // When

    // Then
    expect(case1).toBeFalsy();
    expect(case2).toBeFalsy();
    expect(case3).toBeFalsy();
    // expect(case4).toBeFalsy();
    // expect(case5).toBeFalsy();
    // expect(case6).toBeFalsy();
    // expect(case7).toBeFalsy();
    // expect(case8).toBeFalsy();
    expect(case9).toBeFalsy();
  });

  test('isEmptyInput - 미입력 여부 체크 - Truthy Case', () => {
    // Given
    const case1 = Shared.validation.isEmptyInput('');
    const case2 = Shared.validation.isEmptyInput('   \n\n ');
    const case3 = Shared.validation.isEmptyInput('\r \r');
    const case4 = Shared.validation.isEmptyInput('\t');
    const case5 = Shared.validation.isEmptyInput(' ');
    const case6 = Shared.validation.isEmptyInput('\v');
    const case7 = Shared.validation.isEmptyInput('   ');
    const case8 = Shared.validation.isEmptyInput('\n\n');

    // When

    // Then
    expect(case1).toBeTruthy();
    expect(case2).toBeTruthy();
    expect(case3).toBeTruthy();
    expect(case4).toBeTruthy();
    expect(case5).toBeTruthy();
    expect(case6).toBeTruthy();
    expect(case7).toBeTruthy();
    expect(case8).toBeTruthy();
  });

  test('isEmptyInput - 미입력 여부 체크 - Falsy Case', () => {
    // Given
    const case1 = Shared.validation.isEmptyInput('abcd');
    const case2 = Shared.validation.isEmptyInput('1234');
    const case3 = Shared.validation.isEmptyInput('가나다라');
    const case4 = Shared.validation.isEmptyInput('    Hello');
    const case5 = Shared.validation.isEmptyInput('World    ');
    const case6 = Shared.validation.isEmptyInput('   Hello world   ');
    const case7 = Shared.validation.isEmptyInput('  ภาษาไทย ');
    const case8 = Shared.validation.isEmptyInput('---');

    // When

    // Then
    expect(case1).toBeFalsy();
    expect(case2).toBeFalsy();
    expect(case3).toBeFalsy();
    expect(case4).toBeFalsy();
    expect(case5).toBeFalsy();
    expect(case6).toBeFalsy();
    expect(case7).toBeFalsy();
    expect(case8).toBeFalsy();
  });

  test('isNumericOnly - 숫자 여부 체크 - Truthy Case', () => {
    // Given
    // const case1 = Shared.isNumericOnly('0');
    // const case2 = Shared.isNumericOnly('010');
    // const case3 = Shared.isNumericOnly('1234');
    const case4 = Shared.validation.isNumericOnly(12345);
    const case5 = Shared.validation.isNumericOnly(1 + 2);
    const case6 = Shared.validation.isNumericOnly(Number.MAX_SAFE_INTEGER);

    // When

    // Then
    // expect(case1).toBeTruthy();
    // expect(case2).toBeTruthy();
    // expect(case3).toBeTruthy();
    expect(case4).toBeTruthy();
    expect(case5).toBeTruthy();
    expect(case6).toBeTruthy();
  });

  test('isNumericOnly - 숫자 여부 체크 - Falsy Case', () => {
    // Given
    // const case1 = Shared.validation.isNumericOnly('  0');
    // const case2 = Shared.validation.isNumericOnly('111111a');
    // const case3 = Shared.validation.isNumericOnly('aabb');
    // const case4 = Shared.validation.isNumericOnly(1 + 'b');
    const case5 = Shared.validation.isNumericOnly(NaN);
    const case6 = Shared.validation.isNumericOnly(Number.MAX_VALUE);
    const case7 = Shared.validation.isNumericOnly(-100);
    const case8 = Shared.validation.isNumericOnly(10.1);
    // const case9 = Shared.validation.isNumericOnly(null);
    const case10 = Shared.validation.isNumericOnly(10 / 3);

    // When

    // Then
    // expect(case1).toBeFalsy();
    // expect(case2).toBeFalsy();
    // expect(case3).toBeFalsy();
    // expect(case4).toBeFalsy();
    expect(case5).toBeFalsy();
    expect(case6).toBeFalsy();
    expect(case7).toBeFalsy();
    expect(case8).toBeFalsy();
    // expect(case9).toBeFalsy();
    expect(case10).toBeFalsy();
  });

  test('isValidEmail - 이메일 형식 체크 - Truthy Case', () => {
    // Given
    const case1 = Shared.validation.isValidEmail('abcd@abcd.com');
    const case2 = Shared.validation.isValidEmail('abcd@abcd.co.kr');
    const case3 = Shared.validation.isValidEmail('abcd@aaakr.cc');
    const case4 = Shared.validation.isValidEmail('abcd.abcd@naver.com');

    // When

    // Then
    expect(case1).toBeTruthy();
    expect(case2).toBeTruthy();
    expect(case3).toBeTruthy();
    expect(case4).toBeTruthy();
  });

  test('isValidEmail - 이메일 형식 체크 - Falsy Case', () => {
    // Given
    const case1 = Shared.validation.isValidEmail('abcdefg');
    const case2 = Shared.validation.isValidEmail('https://www.naver.com');
    const case3 = Shared.validation.isValidEmail('@naver.com');
    const case4 = Shared.validation.isValidEmail(' abcd@naver.com');
    const case5 = Shared.validation.isValidEmail('abcd@naver.com ');
    const case6 = Shared.validation.isValidEmail('abcd@naver@abc.com');
    const case7 = Shared.validation.isValidEmail('abcd@naver');

    // When

    // Then
    expect(case1).toBeFalsy();
    expect(case2).toBeFalsy();
    expect(case3).toBeFalsy();
    expect(case4).toBeFalsy();
    expect(case5).toBeFalsy();
    expect(case6).toBeFalsy();
    expect(case7).toBeFalsy();
  });

  test('isRepeatingChars - 동일한 텍스트 연속 사용 체크 - Truthy Case', () => {
    // Given
    const case1 = Shared.validation.isRepeatingChars('121', 1);
    const case2 = Shared.validation.isRepeatingChars('abbc', 2);
    const case3 = Shared.validation.isRepeatingChars('aaab', 3);
    const case4 = Shared.validation.isRepeatingChars('aaaab', 4);
    const case5 = Shared.validation.isRepeatingChars('가나다라라', 2);
    const case6 = Shared.validation.isRepeatingChars('abcd!!!', 3);
    const case7 = Shared.validation.isRepeatingChars('abcd111', 3);
    const case8 = Shared.validation.isRepeatingChars('  abcd', 2);
    const case9 = Shared.validation.isRepeatingChars('\t\tabcd', 2);

    // When

    // Then
    expect(case1).toBeTruthy();
    expect(case2).toBeTruthy();
    expect(case3).toBeTruthy();
    expect(case4).toBeTruthy();
    expect(case5).toBeTruthy();
    expect(case6).toBeTruthy();
    expect(case7).toBeTruthy();
    expect(case8).toBeTruthy();
    expect(case9).toBeTruthy();
  });

  test('isRepeatingChars - 동일한 텍스트 연속 사용 체크 - Falsy Case', () => {
    // Given
    const case1 = Shared.validation.isRepeatingChars('121', 0);
    const case2 = Shared.validation.isRepeatingChars('abbc', 3);
    const case3 = Shared.validation.isRepeatingChars('aaab', 4);
    const case4 = Shared.validation.isRepeatingChars('aaaab', 5);
    // const case5 = Shared.validation.isRepeatingChars('aaaa');
    const case6 = Shared.validation.isRepeatingChars('11', 3);
    // const case7 = Shared.validation.isRepeatingChars(null, 3);
    const case8 = Shared.validation.isRepeatingChars('\n\nabcd', 2);
    // const case9 = Shared.validation.isRepeatingChars(undefined, 2);

    // When

    // Then
    expect(case1).toBeFalsy();
    expect(case2).toBeFalsy();
    expect(case3).toBeFalsy();
    expect(case4).toBeFalsy();
    // expect(case5).toBeFalsy();
    expect(case6).toBeFalsy();
    // expect(case7).toBeFalsy();
    expect(case8).toBeFalsy();
    // expect(case9).toBeFalsy();
  });

  test('isStringLengthOnly - 문자열 자릿 수 체크 - Truthy Case', () => {
    // Given
    const case1 = Shared.validation.isStringLengthOnly('a', 1);
    const case2 = Shared.validation.isStringLengthOnly('ab', 2);
    const case3 = Shared.validation.isStringLengthOnly('abc', 3);
    const case4 = Shared.validation.isStringLengthOnly('   a', 4);
    const case5 = Shared.validation.isStringLengthOnly('\t\taa', 4);
    const case6 = Shared.validation.isStringLengthOnly('가나다라', 4);
    const case7 = Shared.validation.isStringLengthOnly('1234', 4);
    const case8 = Shared.validation.isStringLengthOnly('!!', 2);

    // When

    // Then
    expect(case1).toBeTruthy();
    expect(case2).toBeTruthy();
    expect(case3).toBeTruthy();
    expect(case4).toBeTruthy();
    expect(case5).toBeTruthy();
    expect(case6).toBeTruthy();
    expect(case7).toBeTruthy();
    expect(case8).toBeTruthy();
  });

  test('isStringLengthOnly - 문자열 자릿 수 체크 - Falsy Case', () => {
    // Given
    const case1 = Shared.validation.isStringLengthOnly('a', 0);
    const case2 = Shared.validation.isStringLengthOnly('ab', 1);
    const case3 = Shared.validation.isStringLengthOnly('abc', 4);
    const case4 = Shared.validation.isStringLengthOnly('   a', 2);
    const case5 = Shared.validation.isStringLengthOnly('\n\naa', 4);
    // const case6 = Shared.validation.isStringLengthOnly('abcd');
    const case7 = Shared.validation.isStringLengthOnly('\t\t\t', 2);
    const case8 = Shared.validation.isStringLengthOnly('', 2);

    // When

    // Then
    expect(case1).toBeFalsy();
    expect(case2).toBeFalsy();
    expect(case3).toBeFalsy();
    expect(case4).toBeFalsy();
    expect(case5).toBeFalsy();
    // expect(case6).toBeFalsy();
    expect(case7).toBeFalsy();
    expect(case8).toBeFalsy();
  });

  test('isZeroOnly - 문자열에 0만 있는 지 체크 - Truthy Case', () => {
    // Given
    const case1 = Shared.validation.isZeroOnly('0');
    const case2 = Shared.validation.isZeroOnly('00');
    const case3 = Shared.validation.isZeroOnly('000');
    const case4 = Shared.validation.isZeroOnly('0000');
    const case5 = Shared.validation.isZeroOnly('');

    // When

    // Then
    expect(case1).toBeTruthy();
    expect(case2).toBeTruthy();
    expect(case3).toBeTruthy();
    expect(case4).toBeTruthy();
    expect(case5).toBeTruthy();
  });

  test('isZeroOnly - 문자열에 0만 있는 지 체크 - Falsy Case', () => {
    // Given
    const case1 = Shared.validation.isZeroOnly('1');
    const case2 = Shared.validation.isZeroOnly(' 0');
    const case3 = Shared.validation.isZeroOnly('0 ');
    const case4 = Shared.validation.isZeroOnly('\n0');
    const case5 = Shared.validation.isZeroOnly('\t0');
    const case6 = Shared.validation.isZeroOnly('00 00');
    const case7 = Shared.validation.isZeroOnly('012');
    // const case8 = Shared.validation.isZeroOnly(null);
    // const case9 = Shared.validation.isZeroOnly(undefined);

    // When

    // Then
    expect(case1).toBeFalsy();
    expect(case2).toBeFalsy();
    expect(case3).toBeFalsy();
    expect(case4).toBeFalsy();
    expect(case5).toBeFalsy();
    expect(case6).toBeFalsy();
    expect(case7).toBeFalsy();
    // expect(case8).toBeFalsy();
    // expect(case9).toBeFalsy();
  });
});
