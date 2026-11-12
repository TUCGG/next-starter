/**
 * @fileoverview ESlint Custom Role - '@/shared' 공통 모듈에 대한 import 방식 제한
 *
 * Rule 규칙
 * - 네임스페이스 방식 (import * as ...) 으로만 import 접근 가능
 * - 별칭 (alias)은 반드시 "Shared" 란 고정 네이밍 여야 함
 * - 상대 경로 또는 alias 경로는 import 접근은 허용하지 않음 (ex. '../shared', '~/shared')
 * - import 경로는 반드시 '@/shared/index' 이여야 함 (엔트리 파일명까지 선언)
 *
 * @example
 * import * as Shared from '@/shared/index';
 *
 * @see https://eslint.org/docs/latest/extend/custom-rules
 */

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: `@/shared는 반드시 "import * as Shared from '@/shared/index'" 형식만 허용 됩니다.`
    },
    schema: []
  },
  create: function (context) {
    return {
      ImportDeclaration(node) {
        const importPath = node.source.value;

        // 상대 경로나 '~' alias로 import 인 경우
        const isInvalidSharedImport = importPath.includes('shared') && (importPath.startsWith('.') || importPath.startsWith('..') || importPath.startsWith('~'));

        if (isInvalidSharedImport) {
          context.report({
            node,
            message: `@/shared는 상대 경로나 '~' alias 경로는 허용되지 않습니다. 반드시 '@/shared/index' 로 선언해서 사용하세요.`
          });

          return;
        }

        // '@/shared' 인 경우 (index 생략)
        if (importPath === '@/shared') {
          context.report({
            node,
            message: `@/shared는 반드시 '@/shared/index' 로 선언해서 사용하세요.`
          });

          return;
        }

        // '@/shared/index' 인 경우
        if (importPath === '@/shared/index') {
          const specifier = node.specifiers[0];
          const isValid = node.specifiers.length === 1 && specifier.type === 'ImportNamespaceSpecifier' && specifier.local.name === 'Shared';

          // 밸리데이션 체크
          if (!isValid) {
            context.report({
              node,
              message: `@/shared는 Barrel (index) 파일을 통해 가져오는 방식만 허용됩니다.`
            });
          }
        }
      }
    };
  }
};
