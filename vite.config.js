import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import svgr from 'vite-plugin-svgr'
import { VitePWA } from 'vite-plugin-pwa'
import dotenv from 'dotenv'
import vitePluginCleanCSS from 'vite-plugin-clean-css'
import { createHtmlPlugin } from 'vite-plugin-html'

dotenv.config()

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    svgr({ svgrOptions: { icon: true } }),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: [
        '/favicon.ico',
        '/favicon.png',
        '/logo-calma.svg',
        '/robots.txt',
        '/sitemap.xml',
        '/humans.txt'
      ],
      manifest: {
        name: process.env.VITE_CALMA_NAME,
        short_name: process.env.VITE_CALMA_SHORT_NAME,
        description: process.env.VITE_CALMA_DESCRIPTION,
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#9F814D',
        orientation: 'portrait',
        icons: [
          {
            src: '/images/pwa/icon-1024.png',
            sizes: '1024x1024',
            type: 'image/png'
          },
          {
            src: '/images/pwa/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/images/pwa/icon-384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: '/images/pwa/icon-256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: '/images/pwa/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/images/pwa/icon-180.png',
            sizes: '180x180',
            type: 'image/png'
          },
          {
            src: '/images/pwa/icon-167.png',
            sizes: '167x167',
            type: 'image/png'
          },
          {
            src: '/images/pwa/icon-152.png',
            sizes: '152x152',
            type: 'image/png'
          },
          {
            src: '/images/pwa/icon-144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: '/images/pwa/icon-128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: '/images/pwa/icon-120.png',
            sizes: '120x120',
            type: 'image/png'
          },
          { src: '/images/pwa/icon-96.png', sizes: '96x96', type: 'image/png' },
          { src: '/images/pwa/icon-72.png', sizes: '72x72', type: 'image/png' },
          { src: '/images/pwa/icon-48.png', sizes: '48x48', type: 'image/png' }
        ]
      },
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        navigateFallback: '/index.html',
        globPatterns: [
          '**/*.{js,css,html,xml,png,jpg,jpeg,svg,gif,woff2,json,ttf,ico,mp3,ogg,webp}'
        ],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: { cacheName: 'html-cache', networkTimeoutSeconds: 10 }
          },
          {
            urlPattern: ({ request }) =>
              request.destination === 'script' ||
              request.destination === 'style',
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'static-resources' }
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: { cacheName: 'images-cache' }
          }
        ]
      },
      devOptions: {
        enabled: false, // activa SW en dev para probar
        type: 'module'
      }
    }),
    vitePluginCleanCSS(),
    createHtmlPlugin({ minify: mode === 'production' })
  ],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@features': path.resolve(__dirname, './src/features'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@utils': path.resolve(__dirname, './src/utils')
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: mode !== 'production',
    minify: mode === 'production',
    cssCodeSplit: true,
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production'
      },
      format: {
        comments: false
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor'
        }
      }
    }
  },

  server: {
    hmr: true,
    port: 3000
  }
}))
