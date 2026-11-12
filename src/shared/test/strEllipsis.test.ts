import * as Shared from '@/shared/index';
import {describe, expect, test} from 'vitest';

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
