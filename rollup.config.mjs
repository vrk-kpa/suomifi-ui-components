import progress from 'rollup-plugin-progress';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import ts from 'rollup-plugin-ts';
import postcss from 'rollup-plugin-postcss';
import cssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

import pkg from './package.json' assert { type: 'json' };

const typesTsConfig = {
  declaration: true,
  emitDeclarationOnly: true,
};

const output = {
  js: [
    {
      dir: 'dist/cjs',
      format: 'cjs',
      preserveModules: true,
      sourcemap: true,
      interop: 'auto',
    },
    {
      dir: 'dist/esm',
      format: 'es',
      preserveModules: true,
      exports: 'named',
      sourcemap: true,
      interop: 'auto',
    },
  ],
  types: [
    {
      file: 'dist/tmp/index.js',
      format: 'cjs',
      interop: 'auto',
    },
  ],
  css: [{}],
};

const plugins = (tsConfig, extractCSS) => [
  progress(),
  nodeResolve(),
  commonjs(),
  ts({
    transpiler: 'babel',
    babelConfig: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: [
        '@babel/plugin-transform-runtime',
        ['babel-plugin-styled-components', { ssr: true, displayName: false }],
      ],
    },
    include: ['**/*.ts', '**/*.tsx'],
    transpileOnly: false,
    tsconfig: (resolvedConfig) => ({
      ...resolvedConfig,
      ...tsConfig,
    }),
  }),
  postcss({
    extensions: ['.css', '.scss'],
    plugins: [
      cssImport(),
      autoprefixer(),
      cssnano({
        preset: ['default', { normalizeWhitespace: false }],
      }),
    ],
    inject: false,
    extract: !!extractCSS,
  }),
];

const bundle = (output, tsConfig, exctractCSS) => ({
  input: 'src/index.tsx',
  output: output,
  plugins: plugins(tsConfig, exctractCSS),
  external: [
    /@babel\/runtime/,
    ...(!!pkg.dependencies ? Object.keys(pkg.dependencies) : []),
    ...(!!pkg.devDependencies ? Object.keys(pkg.devDependencies) : []),
    ...(!!pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : []),
  ],
});

export default [
  bundle(output['js'], {}, false),
  bundle(output['types'], typesTsConfig, true),
];
