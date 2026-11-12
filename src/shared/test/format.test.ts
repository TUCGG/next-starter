import * as Shared from '@/shared/index';
import {describe, expect, test} from 'vitest';

describe('[Unit 테스트] - comma', () => {
  test('comma - 양수 콤마 추가', () => {
    // Given
    const num1 = Shared.format.comma(123456789);
    const num2 = Shared.format.comma(987654321);
    const num3 = Shared.format.comma(123);
    const num4 = Shared.format.comma(12);

    // When

    // Then
    expect(num1).toBe('123,456,789');
    expect(num2).toBe('987,654,321');
    expect(num3).toBe('123');
    expect(num4).toBe('12');
  });

  test('comma - 음수 콤마 추가', () => {
    // Given
    const num1 = Shared.format.comma(-123456789);
    const num2 = Shared.format.comma(-987654321);
    const num3 = Shared.format.comma(-123);
    const num4 = Shared.format.comma(-12);

    // When

    // Then
    expect(num1).toBe('-123,456,789');
    expect(num2).toBe('-987,654,321');
    expect(num3).toBe('-123');
    expect(num4).toBe('-12');
  });

  test('comma - 소수 콤마 추가', () => {
    // Given
    const num1 = Shared.format.comma(123456.789);
    const num2 = Shared.format.comma(987654.321);
    const num3 = Shared.format.comma(12.3);
    const num4 = Shared.format.comma(1.2);

    // When

    // Then
    expect(num1).toBe('123,456.789');
    expect(num2).toBe('987,654.321');
    expect(num3).toBe('12.3');
    expect(num4).toBe('1.2');
  });

  // test('comma - 콤마 추가 에러', () => {
  //   // Given
  //   const num1 = Shared.formatter.comma(null);
  //   const num2 = Shared.formatter.comma(undefined);
  //   const num3 = Shared.formatter.comma('abcdefg');
  //   const num4 = Shared.formatter.comma(true);
  //
  //   // When
  //
  //   // Then
  //   expect(num1).toBe('NaN');
  //   expect(num2).toBe('NaN');
  //   expect(num3).toBe('NaN');
  //   expect(num4).toBe('NaN');
  // });
});

describe('[Unit 테스트] - uncomma', () => {
  test('uncomma - 양수 콤마 제거', () => {
    // Given
    const num1 = Shared.format.uncomma('123,456,789');
    const num2 = Shared.format.uncomma('987,654,321');
    const num3 = Shared.format.uncomma('123');
    const num4 = Shared.format.uncomma('12');

    // When

    // Then
    expect(num1).toBe('123456789');
    expect(num2).toBe('987654321');
    expect(num3).toBe('123');
    expect(num4).toBe('12');
  });

  test('uncomma - 음수 콤마 제거', () => {
    // Given
    const num1 = Shared.format.uncomma('-123,456,789');
    const num2 = Shared.format.uncomma('-987,654,321');
    const num3 = Shared.format.uncomma('-123');
    const num4 = Shared.format.uncomma('-12');

    // When

    // Then
    expect(num1).toBe('123456789');
    expect(num2).toBe('987654321');
    expect(num3).toBe('123');
    expect(num4).toBe('12');
  });

  // test('uncomma - 콤마 제거 에러', () => {
  //   // Given
  //   const num1 = Shared.format.uncomma(0);
  //   const num2 = Shared.format.uncomma([1, 2, 3]);
  //   const num3 = Shared.format.uncomma('abcdefg');
  //   const num4 = Shared.format.uncomma(true);
  //
  //   // When
  //
  //   // Then
  //   expect(num1).toBe('0');
  //   expect(num2).toBe('123');
  //   expect(num3).toBe('');
  //   expect(num4).toBe('');
  // });
});

describe('[Unit 테스트] - strEllipsis', () => {
  test('strEllipsis - 텍스트 말줄임 - 기본 테스트', () => {
    // Given
    const str1 = Shared.format.strEllipsis('abcdefghijklmn');
    const str2 = Shared.format.strEllipsis('abab');
    const str3 = Shared.format.strEllipsis('가나다라마바사아자차카타파하');
    const str4 = Shared.format.strEllipsis('                  aa');
    const str5 = Shared.format.strEllipsis('abc', 1);
    const str6 = Shared.format.strEllipsis('abcde', 5);
    const str7 = Shared.format.strEllipsis('\t\t\t\ttest', 5);
    const str8 = Shared.format.strEllipsis('............');

    // When

    // Then
    expect(str1).toBe('abcdefghij...');
    expect(str2).toBe('abab');
    expect(str3).toBe('가나다라마바사아자차...');
    expect(str4).toBe('          ...');
    expect(str5).toBe('a...');
    expect(str6).toBe('abcde');
    expect(str7).toBe('\t\t\t\tt...');
    expect(str8).toBe('.............');
  });
});
