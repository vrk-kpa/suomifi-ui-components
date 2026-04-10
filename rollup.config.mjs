import progress from 'rollup-plugin-progress';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import cssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import dts from 'rollup-plugin-dts';
import { babel } from '@rollup/plugin-babel';
import { bundleStats } from 'rollup-plugin-bundle-stats';

import pkg from './package.json' with { type: 'json' };

const typesTsConfig = {
  declaration: true,
  emitDeclarationOnly: true,
};

const analyze = process.env.ANALYZE === 'true';

const output = {
  js: [
    {
      dir: 'dist/cjs',
      format: 'cjs',
      preserveModules: true,
      sourcemap: true,
      interop: 'auto',
      importAttributesKey: 'with',
    },
    {
      dir: 'dist/esm',
      format: 'es',
      preserveModules: true,
      exports: 'named',
      sourcemap: true,
      interop: 'auto',
      importAttributesKey: 'with',
    },
  ],
  types: [
    {
      file: 'dist/types/index.d.ts',
      format: 'cjs',
    },
  ],
  css: [{}],
};

const babelConfig = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-transform-runtime',
    ['babel-plugin-styled-components', { ssr: true, displayName: false }],
  ],
};

const plugins = (tsConfig, extractCSS) =>
  [
    progress(),
    nodeResolve(),
    commonjs(),
    typescript(tsConfig),
    babel({
      babelHelpers: 'runtime',
      ...babelConfig,
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      include: ['src/**/*'],
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
    analyze &&
      bundleStats({
        outDir: '',
        html: true,
        baseline: false,
        compare: false,
        silent: false,
        open: true,
      }),
    ,
  ].filter(Boolean);

const bundle = (output, tsConfig, extractCSS) => ({
  input: 'src/index.tsx',
  output: output,
  plugins: plugins(tsConfig, extractCSS),
  external: analyze
    ? [
        /@babel\/runtime/,
        ...(!!pkg.devDependencies ? Object.keys(pkg.devDependencies) : []),
        ...(!!pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : []),
      ]
    : [
        /@babel\/runtime/,
        ...(!!pkg.dependencies ? Object.keys(pkg.dependencies) : []),
        ...(!!pkg.devDependencies ? Object.keys(pkg.devDependencies) : []),
        ...(!!pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : []),
      ],
});

export default [
  bundle(output['js'], {}, false),
  {
    input: 'src/index.tsx',
    output: output['types'],
    plugins: [dts()],
  },
];
