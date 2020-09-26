<template>
  <v-container>
    <v-row class="text-center">
      <v-col id="allTasks" class="todo-list">
        <taskList :data="tasks.todo"></taskList>
      </v-col>
      <v-col id="inProgress" class="todo-list">
        <taskList :data="tasks.progress"></taskList>
      </v-col>
      <v-col id="completed" class="todo-list">
        <taskList :data="tasks.completed"></taskList>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'HelloWorld',
  components: {
    taskList: () => import('@/components/TaskList')
  },
  data: () => ({}),
  computed: {
    ...mapGetters([
      'tasks'
    ]),
  }
}
</script>
<style>

</style>
