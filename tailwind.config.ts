import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
	content: [
		'./components/**/*.{js,vue,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./app.vue',
		'./error.vue',
		'./nuxt.config.ts'
	],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem'
			},
			screens: {
				sm: '100%',
				md: '100%',
				lg: '1200px',
				xl: '1200px'
			}
		},
		extend: {
			colors: {
				'light-primary': '#f8f5ed',
				'gray-text': '#707070'
			}
		}
	},
	plugins: [
		require('tailwind-scrollbar')
	]
}
