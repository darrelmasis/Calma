// run.js
import { execSync } from 'child_process';

const commands = [
  'node ./scripts/optimized-images.js',
  'node ./scripts/process-icons.js',
  'node ./scripts/generate-robots.js',
  'node ./scripts/generate-humans.js',
  'node ./scripts/generate-sitemap.js',
  'vite build'
];

for (const cmd of commands) {
  execSync(cmd, { stdio: 'inherit' });
  // console.log(`✅ ${cmd.split('/').pop().replace('.js', '')} ejecutado correctamente!`);
}

