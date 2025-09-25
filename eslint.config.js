import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'

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
        ecmaFeatures: {
          jsx: true
        }
      }
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y
    },

    rules: {
      'no-unused-vars': 'warn', // advertencias opcionales
      'no-console': 'warn',
      'react/prop-types': 'off'
    },

    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        alias: {
          map: [
            ['@', './src'],
            ['@assets', './src/assets'],
            ['@components', './src/components'],
            ['@features', './src/features'],
            ['@hooks', './src/hooks'],
            ['@pages', './src/pages'],
            ['@routes', './src/routes'],
            ['@styles', './src/styles'],
            ['@utils', './src/utils']
          ],
          extensions: ['.js', '.jsx']
        }
      }
    }
  }
]
