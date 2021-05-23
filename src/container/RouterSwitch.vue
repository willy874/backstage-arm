<template>
  <transition-group name="page">
    <div
      key="list"
      class="position-inset d-flex flex-column flex-fill transform-origin-top"
      v-if="$route.name === routerName"
    >
      <slot name="list"></slot>
    </div>
    <div
      key="image-list"
      class="position-inset d-flex flex-column flex-fill transform-origin-top"
      v-else-if="$route.name === `${routerName}ImageDetail`"
    >
      <router-view v-bind="_assignPropsData" />
    </div>
    <div
      key="image-detail"
      class="position-inset d-flex flex-column flex-fill transform-origin-bottom"
      v-else-if="$route.name === `${routerName}ImageList`"
    >
      <router-view v-bind="_assignPropsData" />
    </div>
    <div
      key="reservation-list"
      class="position-inset d-flex flex-column flex-fill transform-origin-bottom"
      v-else-if="$route.name === `${routerName}ReservationList`"
    >
      <router-view v-bind="_assignPropsData" />
    </div>
    <div
      key="detail"
      class="position-inset d-flex flex-column flex-fill transform-origin-bottom"
      v-else-if="$route.name === `${routerName}Detail`"
    >
      <router-view v-bind="_assignPropsData" />
    </div>
  </transition-group>
</template>

<script>
export default {
  name: 'RouterSwitch',
  props: {
    routerName: {
      type: String,
    },
  },
}
</script>

<style lang="scss" scoped>
.page-enter-active,
.page-leave-active {
  transition: transform 400ms ease;
}
.page-enter,
.page-leave-to {
  transform: scaleY(0);
}
.page-enter-to,
.page-leave {
  transform: scaleY(1);
}
</style>
