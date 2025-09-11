import { SitemapStream, streamToPromise } from 'sitemap';
import { writeFileSync } from 'fs';

const sitemap = new SitemapStream({ hostname: 'https://www.calma.salon' });

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

// Finalizar el stream
sitemap.end();

// Convertir a promesa y escribir el sitemap.xml
streamToPromise(sitemap)
  .then(data => {
    writeFileSync('../public/sitemap.xml', data.toString());
    console.log('Sitemap generado correctamente en public/sitemap.xml');
  })
  .catch(err => {
    console.error('Error al generar el sitemap:', err);
  });
