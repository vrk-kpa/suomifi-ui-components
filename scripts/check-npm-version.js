const { execSync } = require('child_process');
const semver = require('semver');

// Only check in dev (skip in CI if needed)
if (process.env.CI) process.exit(0);

const npmVersion = execSync('npm --version', { encoding: 'utf-8' }).trim();

if (!semver.gte(npmVersion, '11.10.0')) {
  console.warn(
    `\n⚠️  npm ${npmVersion} detected. Library development requires npm >=11.10.0 for min-release-age security.\n`,
  );
  process.exit(1);
}
