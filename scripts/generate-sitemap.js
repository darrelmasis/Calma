import { SitemapStream, streamToPromise } from 'sitemap';
import fs from 'fs';
import path from 'path';
import { configDotenv } from 'dotenv';

configDotenv({ quiet: true });

// Carpeta public (asegúrate que exista)
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const sitemap = new SitemapStream({ hostname: process.env.VITE_CALMA_URL });

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/history', changefreq: 'weekly', priority: 0.8 },
  { url: '/services', changefreq: 'weekly', priority: 0.8 },
  { url: '/packages', changefreq: 'monthly', priority: 0.7 },
  { url: '/booking', changefreq: 'monthly', priority: 0.6 },
  { url: '/team', changefreq: 'monthly', priority: 0.5 },
];

// Escribir todas las URLs en el stream
links.forEach(link => sitemap.write(link));
sitemap.end();

// Convertir a promesa y escribir el sitemap.xml
streamToPromise(sitemap)
  .then(data => {
    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, data.toString());
    console.log('✅ Sitemap generado correctamente.');
  })
  .catch(err => {
    console.error('❌ Error al generar el sitemap:', err);
  });
