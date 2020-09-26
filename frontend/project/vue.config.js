module.exports = {
	"transpileDependencies": [
		"vuetify"
	],
  outputDir: 'dist',
	publicPath: process.env.NODE_ENV === 'production'
		? '/FullStack-Kanban/'
		: '/',
	pluginOptions: {
		apollo: {
			enableMocks: false,
			enableEngine: false
		}
	}
}
