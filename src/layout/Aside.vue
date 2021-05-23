<template>
  <aside
    class="d-flex flex-shrink-0 flex-column bg-info transform transition will-change"
    :style="{
      height: global.windowInnerWidth < deviceSwitch ? '100vh' : 'auto',
      width: global.asideShow && !(global.windowInnerWidth < deviceSwitch) ? '40px' : `${asideWidth}px`,
      position: global.windowInnerWidth < deviceSwitch ? 'fixed' : 'relative',
      '--translate-x': global.windowInnerWidth < deviceSwitch && !global.asideShow ? `-100%` : 0,
      zIndex: 10,
    }"
  >
    <header v-if="$slots.header">
      <slot name="header"></slot>
    </header>
    <article class="scroll-panel flex-grow-1">
      <slot name="default"></slot>
    </article>
    <footer v-if="$slots.footer">
      <slot name="footer"></slot>
    </footer>
  </aside>
</template>

<script>
import config from '@/config'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      asideWidth: config.layout.asideWidth,
      deviceSwitch: config.layout.deviceSwitch,
    }
  },
  computed: {
    ...mapState({
      global: (state) => state.global,
    }),
  },
}
</script>

<style></style>
