import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import path from 'path'

export default [
  {
    // Archivos a analizar
    files: ['src/**/*.{js,jsx}'],

    // Ignorar dependencias y builds
    ignores: [
      'node_modules/**',
      'build/**',
      'dist/**',
      '.next/**',
      'public/**'
    ],

    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly'
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
      }
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y
    },

    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'warn',
      'react/prop-types': 'off'
    },

    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        alias: {
          map: [
            ['@', path.resolve('./src')],
            ['@assets', path.resolve('./src/assets')],
            ['@components', path.resolve('./src/components')],
            ['@features', path.resolve('./src/features')],
            ['@hooks', path.resolve('./src/hooks')],
            ['@pages', path.resolve('./src/pages')],
            ['@routes', path.resolve('./src/routes')],
            ['@styles', path.resolve('./src/styles')],
            ['@utils', path.resolve('./src/utils')]
          ],
          extensions: ['.js', '.jsx']
        }
      }
    }
  }
]
