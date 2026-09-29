import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTypescript,
  globalIgnores([
    // build artefacts and dependencies
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'node_modules/**',
    // local agent worktrees
    '.kilo/**',
  ]),
  {
    rules: {
      // base64 data URIs cannot be handled by next/image
      '@next/next/no-img-element': 'off',
    },
  },
])

export default eslintConfig
