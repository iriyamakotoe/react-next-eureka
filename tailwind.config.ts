import type {Config} from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				student: {
					600: '#a4c1d7',
					800: '#557EA7',
				},
				school: {
					800: '#a65555',
				},
			},
		},
	},
	plugins: [],
}
export default config
