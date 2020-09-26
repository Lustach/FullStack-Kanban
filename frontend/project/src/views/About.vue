<template>
  <div class="about d-flex justify-center align-center flex-column" style="height:calc(100vh - 65px)">
    <h1>This is an about page</h1>
    <v-card max-width="500px" v-if="taskInfo">
      <v-card-title>Название: {{taskInfo.title}}</v-card-title>
      <v-card-text>
        <h2 class="mb-4">Категория: {{$route.params.id}}</h2>
        <h3 class="mb-4">Описание:{{taskInfo.description}}</h3>
        <h3 class="mb-4"> Выполнено : <span v-show="taskInfo.state">Да</span> <span v-show="!taskInfo.state">Нет</span></h3>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" text rounded @click="deleteOneTask">Удалить</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import {mapGetters} from "vuex"
import {DELETE_TASK} from '../store/index'
export default {
  name: 'App',
  beforeMount() {
  },
  data: () => ({
    DELETE_TASK: DELETE_TASK
  }),
  methods:{
    deleteOneTask(){
      this.$store.dispatch(this.DELETE_TASK, { categoryId: this.$route.params.id, index: this.$route.params.name })
      this.$router.go(-1)
    }
  },
  computed: {
    ...mapGetters([
      'tasksByCategory',
    ]),
    taskInfo() {
      return this.tasksByCategory(this.$route.params.id).tasks.filter(e => e.title === this.$route.params.name)[0]
    }
  },
}
</script>
