<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="6">
        <taskList :data="tasksByCategory(this.$route.params.id)"></taskList>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "TaskAbout",
  components: {
    taskList: () => import('@/components/TaskList')
  },
  beforeMount() {
  },
  methods:{
  },
  computed: {
    ...mapGetters([
      "tasksByCategory",
    ])
  },
}
</script>

<style scoped>

</style>
