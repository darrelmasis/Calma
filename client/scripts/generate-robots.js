// generate-robots.js
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const calmaUrl = process.env.VITE_CALMA_URL;

// Configuración básica
const robotsConfig = {
  sitemap: `${calmaUrl}/sitemap.xml`, // Cambia por tu URL
  disallow: [
    // Rutas que NO quieres indexar
    '/admin',
    '/private',
  ],
  allow: [
    // Rutas que sí quieres indexar (opcional)
    '/',
  ],
  userAgent: '*', // Googlebot o * para todos
};

// Genera el contenido del robots.txt
const generateRobotsTxt = (config) => {
  let content = `User-agent: ${config.userAgent}\n`;

  if (config.allow?.length) {
    config.allow.forEach((url) => {
      content += `Allow: ${url}\n`;
    });
  }

  if (config.disallow?.length) {
    config.disallow.forEach((url) => {
      content += `Disallow: ${url}\n`;
    });
  }

  if (config.sitemap) {
    content += `Sitemap: ${config.sitemap}\n`;
  }

  return content;
};

// Escribir el archivo robots.txt en la carpeta public
const robotsTxt = generateRobotsTxt(robotsConfig);
const outputPath = path.join(process.cwd(), 'public', 'robots.txt');

fs.writeFileSync(outputPath, robotsTxt);
console.log(`✅ robots.txt generado en: ${outputPath}`);
