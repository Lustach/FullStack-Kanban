<template>
  <v-card class="pb-4">
    <v-row class="align-center">
      <v-col class="mr-2" cols="10">
        <v-card-title class="d-flex justify-center pr-0">
          <h5 class="text-h5">{{ data.title }}</h5>
        </v-card-title>
      </v-col>
    </v-row>
    <draggable :list="data.tasks" class="px-4" group="tasks">
      <v-card-text v-for="(e,i) in data.tasks" :key="i" class="py-0 mb-2 test">
        <v-row class="d-flex align-center">
          <v-col class="d-flex flex-row align-center" cols="12">
            <v-text-field v-model="e.title" :disabled="e.state" class="custom-input__title pr-3" hide-details solo></v-text-field>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" color="pink" icon small>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="changeState(i)">
                  <v-list-item-title class="d-flex align-center justify-lg-space-between"><span v-show="e.state===true">Выполнено</span>
                    <span v-show="e.state===false">Не выполнено</span>
                    <v-checkbox v-model="e.state" class="ml-2"></v-checkbox>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item @click="deleteOneTask(i,data.title)">
                  <v-list-item-title>Удалить</v-list-item-title>
                </v-list-item>
                <v-list-item @click="openTask(i,data.title)">
                  <v-list-item-title>Подробнее</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-card-text>
    </draggable>
  </v-card>
</template>
<script>
import draggable from 'vuedraggable'
import {DELETE_TASK, UPDATE_LC} from '../store/index'
import {mapGetters} from 'vuex'

export default {
  name: 'TaskList',
  components: {
    draggable,
  },
  props: {
    data: {
      type: Object,
      required: true,
      default: () => [],
    }
  },
  data: () => ({
    items: [
      { title: 'edit', action: 'changeState' },
      { title: 'delete', action: 'delete' }
    ],
    DELETE_TASK: DELETE_TASK
  }),
  methods: {
    deleteOneTask(index, category) {
      if (this.$route.params.id)
        this.$store.dispatch(this.DELETE_TASK, { categoryId: this.$route.params.id, index: index })
      else {
        this.$store.dispatch(this.DELETE_TASK, { categoryId: category, index: index })
      }
    },
    changeState(index) {
      this.data.tasks[index].state = !this.data.tasks[index].state
      this.$set(this.data.tasks, index, this.data.tasks[index])
      this.$store.dispatch(UPDATE_LC, { categoryId: this.data.title })
    },
    openTask(index, category) {
      if (this.$route.name === 'TaskAbout')
        this.$router.push(this.$route.path + '/title=' + this.data.tasks[index].title)
      if (this.$route.name === 'Main') {
        this.$router.push(`/tasks_by_category=${category}/title=${this.data.tasks[index].title}`)
      }
    }
  },
  computed: {
    ...mapGetters(["tasksByCategory"])
  }
}
</script>
<style scoped>
.custom-input__title >>> .v-text-field__slot input {
//color: #1565ee; cursor: move !important;
}
</style>
