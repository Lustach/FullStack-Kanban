import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		redirect: '/main'
	},
	{
		path: '/main',
		name: 'Main',
		component: () => import('../components/HelloWorld.vue')
	},
	{
		path: '/categoryList',
		name: 'CategoryList',
		component: () => import('../views/CategoryList.vue')
	},
	{
		path: '/tasks_by_category=:id/title=:name',
		name: 'About',
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	},
	{
		path: '/tasks_by_category=:id',
		name: 'TaskAbout',
		component: () => import(/* webpackChunkName: "about" */ '../views/TaskAbout.vue')
	},

]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
