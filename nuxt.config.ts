// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	modules: [
		'@pinia/nuxt',
	],

	css: [
		'@/assets/styles.css'
	],

	runtimeConfig: {
		public: {
			API_PAGES_DATA_URL: 'http://esimvpnapi.com/api/v1/'
		}
	}
})
