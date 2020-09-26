<template>
  <v-app>
    <v-app-bar
        app
    >
      <div class="d-flex align-center">
        <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
        />
      </div>
      <router-link active-class="active_link" class="text-h4 px-4" to="/categoryList">Категории</router-link>
      <router-link active-class="active_link" class="text-h4 px-4" to="/main">Главная</router-link>
      <v-spacer></v-spacer>

      <v-btn
          text
          @click="clearLc()"
      >
        <span class="mr-2">Очистить localStorage</span>
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

import {mapGetters} from "vuex"
import {SET_TASKLIST} from "@/store"

export default {
  name: 'App',
  mounted() {
    if (this.localStorageLength === 0) {
      for (const key in this.tasks) {
        if (Object.prototype.hasOwnProperty.call(this.tasks, key))
          localStorage.setItem(key, JSON.stringify(this.tasks[key]))
      }
    } else {
      this.$store.commit(SET_TASKLIST)
    }
  },
  data: () => ({}),
  methods: {
    clearLc() {
      localStorage.clear()
    }
  },
  computed: {
    ...mapGetters([
      'tasks'
    ]),
    localStorageLength() {
      let allStrings = 0
      for (let key in this.tasks) {
        if (Object.prototype.hasOwnProperty.call(this.tasks, key)) {
          if (Object.prototype.hasOwnProperty.call(localStorage, key))
            allStrings++
        }
      }
      return allStrings
    }
  }
}
</script>
<style lang="scss" scoped>
.active_link {
  color: black;
}
</style>
