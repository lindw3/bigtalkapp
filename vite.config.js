import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
base: '/bigtalkapp/',
plugins: [
react(),
VitePWA({
registerType: 'autoUpdate',
includeAssets: ['favicon.svg'],
manifest: {
name: 'Discussion App',
short_name: 'Discussion',
description: 'Personliga diskussionsfrågor',
theme_color: '#ffffff',
background_color: '#ffffff',
display: 'standalone',
start_url: '/bigtalkapp/',
scope: '/bigtalkapp/',
icons: [
{
src: 'pwa-192x192.png',
sizes: '192x192',
type: 'image/png'
},
{
src: 'pwa-512x512.png',
sizes: '512x512',
type: 'image/png'
}
]
}
})
]
})