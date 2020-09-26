<template>
  <div class="d-flex justify-center align-center" style="height:calc(100vh - 65px)">
    <router-link class="px-5" v-for="e in categories" :key="e"  :to="'/tasks_by_category='+e">{{e}}</router-link>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "CategoryList",
  data: ()=>({

  }),
  computed: {
    ...mapGetters([
        'categories',
    ]),
  },
}
</script>

<style scoped>

</style>
