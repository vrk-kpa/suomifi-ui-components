import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import resolve from '@rollup/plugin-node-resolve';
import cssnano from 'cssnano';
import commonjs from '@rollup/plugin-commonjs';
import cssImport from 'postcss-import';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/index.tsx',
    output: [
      { file: 'dist/index.js', format: 'cjs' },
      {
        file: 'dist/index.es.js',
        format: 'es',
        exports: 'named',
      },
    ],
    plugins: [
      typescript({
        outDir: './dist',
      }),
      resolve(),
      commonjs(),
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
        // only write out CSS for the first bundle (avoids pointless extra files):
        // extract: !!options.writeMeta && 'main.css',
      }),
    ],
  },
];
