const fs = require('fs-extra');
const packagejson = require('./package.json');

const destination = `.styleguidist/assets/v${packagejson.version}/`;

try {
  fs.moveSync('tmp/build', `${destination}/build`, {
    overwrite: true,
  });
  fs.moveSync('tmp/index.html', `${destination}/index.html`, {
    overwrite: true,
  });
  fs.removeSync('tmp');
  console.log(
    `Moved tmp to directory .styleguidist/assets/v${packagejson.version}`,
  );
} catch (err) {
  console.log(err);
}
