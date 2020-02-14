const fs = require('fs');
const cleanCSS = require('clean-css');
const globalCssFiles = [
  'src/core/theme/fontFaces.css',
  'node_modules/@reach/menu-button/styles.css',
];
const outputFile = 'dist/main.css';

function main() {
  const cssContent = globalCssFiles.reduce((content, filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return (content += fileContent);
  }, '');
  fs.writeFileSync(
    outputFile,
    new cleanCSS({ inline: ['none'] }).minify(cssContent).styles,
  );
}

main();
