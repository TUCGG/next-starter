module.exports = {
  printWidth: 240,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: false,
  endOfLine: 'auto',

  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: require('./plugins/import-order.cjs'),
  importOrderSeparation: true,
  importOrderSortSpecifiers: true
};
