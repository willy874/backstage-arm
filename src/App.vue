<template>
  <div id="app" class="">
    <Layout />
  </div>
</template>

<script>
import Layout from '@/layout/Index.vue'

export default {
  data() {
    return {
      init: true,
    }
  },
  created() {
    const $auth = this.$auth()
    const $db = this.$db()
    this.$globalInit({
      $auth,
      $db,
      $router: this.$router,
      $store: this.$store,
    })
    this.$root.login = this.$store.dispatch('adminLoing')
    window.addEventListener('resize', () => {
      this.$store.commit('setWindowInnerWidth')
    })
  },
  watch: {
    $route() {
      const lastPage = this.$router.currentRoute.path
      if (lastPage !== '/login' || (!this.init && lastPage !== '/')) {
        localStorage.setItem('last-page', lastPage)
        this.init = false
      }
    },
  },
  components: {
    Layout,
  },
}
</script>

<style lang="scss" src="@/style/main.scss"></style>
