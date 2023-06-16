import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import alias from '@rollup/plugin-alias'

import path from 'path'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs'
    },
    {
      file: 'dist/bundle.esm.js',
      format: 'es'
    }
  ],
  plugins: [
    typescript({
      exclude: 'node_modules/**',
      tsconfig: './tsconfig.json'
    }),
    alias({
      resolve: ['.js', 'ts'],
      entries: {
        find: '@',
        replacement: path.resolve(path.dirname(__dirname), 'src')
      }
    }),
    resolve()
  ]
}
