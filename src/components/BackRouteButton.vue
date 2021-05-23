<template>
  <div v-if="backRoute">
    <RouterLink :to="backRoute" class="btn btn-primary text-white d-flex align-items-center">
      <Icon class="transform rotate-180 mr-2" pattern="Arrow" size="12" />
      <span>回列表</span>
    </RouterLink>
  </div>
</template>

<script>
export default {
  name: 'BackRouteButton',
  props: {
    backRoute: {
      type: [String, Object],
    },
  },
  data() {
    return {}
  },
}
</script>

<style></style>
