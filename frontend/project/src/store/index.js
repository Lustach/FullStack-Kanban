import Vue from 'vue'
import Vuex from 'vuex'

export const DELETE_TASK = 'delete/task'
export const SET_TASKLIST = 'set/task_list'
export const UPDATE_LC = 'update/local_storage'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		tasks: {
			todo: {
				title: 'Все задачи',
				tasks: [
					{ title: 'Переделать как в трелло', mark: 'Ну ', state: false, description: 'ОПИСАНИЕ ЗАДАЧИ' }, {
						title: 'хопа',
						mark: '1Ну ',
						state: false,
						description: 'ОПИСАНИЕ ЗАДАЧИ'
					},
					{ title: 'прихлопа', mark: 'Ну', state: false, description: 'ОПИСАНИЕ ЗАДАЧИ' }, { title: 'алеоп', mark: '1Ну ', state: false, description: 'ОПИСАНИЕ ЗАДАЧИ' },
				],
			},
			progress: {
				title: 'В процессе выполнения',
				tasks: [
					{ title: 'В процессе выполнения', mark: 'Ну ', description: 'ОПИСАНИЕ ЗАДАЧИ' }, { title: 'В процессе выполнения1', mark: '1Ну ', description: 'ОПИСАНИЕ ЗАДАЧИ' },
				]
			},
			completed: {
				title: 'Завершённые',
				tasks: [
					{ title: 'Завершённые', mark: 'Ну ', description: 'ОПИСАНИЕ ЗАДАЧИ' }, { title: 'Завершённые1', mark: '1Ну ', description: 'ОПИСАНИЕ ЗАДАЧИ' },
				]
			},
		},
		categories: ['Все задачи', 'В процессе выполнения', 'Завершённые']
	},
	actions: {
		[DELETE_TASK]({ commit, getters }, data) {
			commit(DELETE_TASK, { data, getters })
			commit(UPDATE_LC, { data, getters })
		},
		[UPDATE_LC]({ commit, getters }, data) {
			commit(UPDATE_LC, { data, getters })
		}
	},
	mutations: {
		[DELETE_TASK](state, { data, getters }) {
			if (typeof data.index === "number")
				getters.tasksByCategory(data.categoryId).tasks.splice(data.index, 1)
			if (typeof data.index === "string") {
				let index = (getters.tasksByCategory(data.categoryId).tasks.find((e, i) => {
					e.index = i
					return e.title === data.index
				}))
				getters.tasksByCategory(data.categoryId).tasks.splice(index.index, 1)
			}
		},
		[SET_TASKLIST](state) {
			for (const dataKey in localStorage) {
				if (Object.prototype.hasOwnProperty.call(localStorage, dataKey)) {
					if (Object.prototype.hasOwnProperty.call(state.tasks, dataKey)) {
						Vue.set(state.tasks, dataKey, JSON.parse(localStorage[dataKey]))
					}
				}
			}
		},
		[UPDATE_LC](state, { data, getters }) {
			for (const dataKey in state.tasks) {
				if (state.tasks[dataKey] === getters.tasksByCategory(data.categoryId)) {
					localStorage.setItem(dataKey, JSON.stringify(getters.tasksByCategory(data.categoryId)))
				}
			}
		}
	},
	modules: {},
	getters: {
		tasks: state => state.tasks,
		categories: state => state.categories,
		tasksByCategory: state => id => {
			for (const key in state.tasks) {
				if (state.tasks[key].title === id) {
					return state.tasks[key]
				}
			}
		},
	}
})
