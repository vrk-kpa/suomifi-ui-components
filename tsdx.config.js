const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const cssImport = require('postcss-import');
const typescript = require('@wessberg/rollup-plugin-ts');

module.exports = {
  rollup(config, options) {
    config.plugins = config.plugins.map(plugin => {
      if (plugin && plugin.name === 'rpt2') {
        return typescript({
          transpiler: 'babel',
          include: ['**/*.ts', '**/*.tsx'],
          transpileOnly: options.transpileOnly || !options.writeMeta,
        });
      }
      return plugin;
    });
    config.plugins.push(
      postcss({
        extensions: ['.css', '.scss'],
        plugins: [
          cssImport(),
          autoprefixer(),
          cssnano({
            preset: 'default',
          }),
        ],
        inject: false,
        // only write out CSS for the first bundle (avoids pointless extra files):
        extract: !!options.writeMeta && 'dist/main.css',
      }),
    );
    return config;
  },
};
