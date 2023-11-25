const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const postcss = require('rollup-plugin-postcss');

const pkg = require('./package.json');

const basePlugins = [commonjs({ requireReturnsDefault: 'preferred' })];

const external = [
  'firebase/auth',
  'firebase/firestore',
  'react/jsx-runtime',
  ...Object.keys(pkg.devDependencies),
  ...Object.keys(pkg.peerDependencies)
];

const baseConfig = { input: 'src/index.ts', external };

const configBase = [
  {
    ...baseConfig,
    plugins: basePlugins.concat(typescript({ tsconfig: './tsconfig.json' }), postcss()),
    output: [
      {
        dir: 'dist',
        exports: 'named',
        format: 'cjs',
        inlineDynamicImports: true,
        interop: 'auto'
      },
      {
        dir: 'dist',
        chunkFileNames: '[name]-[hash].mjs',
        entryFileNames: '[name].mjs',
        exports: 'named',
        format: 'es',
        inlineDynamicImports: true
      }
    ]
  }
];

module.exports = configBase;
