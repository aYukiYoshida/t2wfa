import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import importPlugin from "eslint-plugin-import";

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, prettier],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx", ".d.ts"],
      },
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
        node: {
          extensions: [".js", ".mjs", ".cjs", ".ts", ".tsx", ".d.ts"],
        },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // Node.js 組み込みモジュール (fs, path など)
            "external", // npm パッケージ
            "internal", // 内部モジュール (エイリアスなど)
            ["parent", "sibling"], // 親/兄弟ディレクトリ
            "index", // index ファイル
            "object", // object-imports
            "type", // type imports
          ],
          "newlines-between": "always", // グループ間に空行を入れる
          alphabetize: {
            order: "asc", // アルファベット昇順
            caseInsensitive: true, // 大文字小文字を区別しない
          },
        },
      ],
    },
  },
)
