// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	vite: {
		vue: {
			isProduction: true,
			script: {
				defineModel: true,
				propsDestructure: true
			}
		}
	},
	app: {
		head: {
			bodyAttrs: {
				class: 'bg-light-primary dark:bg-black'
			}
		}
	},
	devtools: { enabled: false },
	ssr: false,
	spaLoadingTemplate: false,
	css: ['~/assets/css/main.css'],
	modules: [
		'@nuxt/ui',
		'@pinia/nuxt',
		'@pinia-plugin-persistedstate/nuxt',
		'@nuxt/eslint',
		'nuxt-svgo'
	],
	svgo: {
		autoImportPath: './assets/images/',
		defaultImport: 'component'
	},
	eslint: {
		config: {
			stylistic: {
				indent: 'tab',
				semi: false,
				commaDangle: 'never'
			}
		}
	},
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {}
		}
	},
	generate: {
		fallback: '404.html'
	}
})