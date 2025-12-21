import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'BigTalk',
        short_name: 'BigTalk',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-180.png', sizes: '180x180', type: 'image/png' }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^.*$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'big-talk-pages-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60 // 1 dag
              }
            }
          }
        ]
      }
    })
  ]
});
