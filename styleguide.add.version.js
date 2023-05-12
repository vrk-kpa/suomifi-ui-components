const fs = require('fs');
const packagejson = require('./package.json');

try {
  const data = fs.readFileSync('./styleguide.versions.json', 'utf8');
  const versions = JSON.parse(data);
  const exists = versions.find(
    (version) => version.name === `v${packagejson.version}`,
  );
  if (exists) {
    console.error(
      `Version ${packagejson.version} already exists, duplicate not added to styleguide.versions.json`,
    );
    return;
  }
  // Add version from package.json as section link to Styleguidist
  versions.unshift({
    name: `v${packagejson.version}`,
    href: `/v${packagejson.version}`,
  });
  fs.writeFile(
    './styleguide.versions.json',
    JSON.stringify(versions),
    (err) => {
      if (err) {
        console.log(err);
      }
    },
  );
  console.log(`Added version ${packagejson.version}`);
} catch (err) {
  console.error(err);
}
