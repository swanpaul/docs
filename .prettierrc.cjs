/** Prettier 格式化設定 */

module.exports = {
    semi: false, // 句尾是否添加分號
    eslintIntegration: true, //
    singleQuote: true, // 使用單引號取代雙引號
    tabWidth: 4, // 縮進字節數
    trailingComma: 'es5', // 在物件或陣列最後一個元素後面是否加逗號
    bracketSpacing: true, // 在物件內容之間加空格 "{ foo: bar }"
    arrowParens: 'avoid', // 省略箭頭函式的括號,

    overrides: [
        {
            files: ['**/*.json', '**/*.md'],
            options: {
                tabWidth: 2, // 縮進字節數
            },
        },
    ],
}
