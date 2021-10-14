import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import Pages from 'vite-plugin-pages'
import ViteComponents from 'vite-plugin-components'
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'
import { resolve } from 'path'
import { readFileSync } from 'fs'
export default defineConfig({
	build: {
		target: 'es2020'
	},
	resolve: {
		alias: {
			'~/': `${resolve(__dirname, 'src')}/`
		}
	},
	define: {
		BUILT_AT: JSON.stringify(Date.now())
	},
	plugins: [
		Vue(),
		Pages(),
		VitePWA({
			srcDir: 'src',
			filename: 'sw.ts',
			base: '/',
			strategies: 'injectManifest',
			registerType: 'autoUpdate',
			manifest: {
				theme_color: '#090a16',
				background_color: '#090a16',
				name: 'Vis',
				short_name: 'Vis',
				start_url: '.',
				display: 'standalone',
				description: "Vis",
				icons: [
					{
						src: '/android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any maskable'
					},
					{
						src: '/android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			}
		}),
		ViteComponents({
			customComponentResolvers: [
				ViteIconsResolver({
					componentPrefix: ''
				})
			]
		}),
		ViteIcons()
	],
	optimizeDeps: {
		include: ['vue', 'vue-router', '@vueuse/core'],
		exclude: ['vue-demi']
	}
})