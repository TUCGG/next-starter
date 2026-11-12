const importOrder = [
  '^next',
  '^react',
  '<THIRD_PARTY_MODULES>',

  '^@/app/(.*)$',
  '^@/server-actions/(.*)$',
  '^@/data/(.*)$',
  '^@/util/(.*)$',
  '^@/middleware/(.*)$',
  '^@/locale/(.*)$',
  '^@/context/(.*)$',
  '^@/store/(.*)$',
  '^@/queries/(.*)$',
  '^@/repository/(.*)$',
  '^@/hooks/(.*)$',
  '^@/components/(.*)$',
  '^@providers/(.*)$',

  '^[./]'
];

module.exports = importOrder;
