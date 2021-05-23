<template>
  <nav class="py-2">
    <ul class="font-weight-bold list-unstyled">
      <template v-for="item in navRouter">
        <li v-if="item.children && item.children.length > 1" :key="item.name" :class="{ active: isActive(item) }">
          <a
            class="bg-white transition d-flex align-items-center text-white text-decoration-none overflow-hidden"
            href="javascript:;"
            @click="toggleMenu(item)"
          >
            <i class="d-block flex-shrink-0 py-2 mx-2" style="width: 32px">
              <Icon v-if="item.icon" :pattern="item.icon" size="24" />
            </i>
            <span class="flex-grow-1 text-nowrap overflow-hidden">{{ item.title }}</span>
            <i class="d-block flex-shrink-0 p-2 transition transform" :class="{ 'rotate-90': item.open }">
              <Icon pattern="Arrow" size="12" />
            </i>
          </a>
          <ul
            class="transition-panel list-unstyled overflow-hidden"
            :style="{ maxHeight: item.open ? `${40 * item.children.length}px` : 0 }"
            :open="item.open"
          >
            <li v-for="_item in item.children" :key="_item.name">
              <RouterLink
                :to="_item.path"
                class="bg-white transition d-flex align-items-center text-white text-decoration-none py-2"
              >
                <i class="d-block flex-shrink-0" style="width: 48px"></i>
                <span class="flex-grow-1 text-nowrap overflow-hidden" v-if="_item.props">{{ _item.props.title }}</span>
              </RouterLink>
            </li>
          </ul>
        </li>
        <li
          v-else-if="item.children && item.children.length === 1"
          :key="item.children[0].name"
          :class="{ active: isActive(item) }"
        >
          <RouterLink
            :to="item.children[0].path"
            class="bg-white transition d-flex align-items-center text-white text-decoration-none"
          >
            <i class="d-block flex-shrink-0 py-2 mx-2" style="width: 32px">
              <Icon v-if="item.icon" :pattern="item.icon" size="24" />
            </i>
            <span class="flex-grow-1 text-nowrap overflow-hidden" v-if="item.children[0].props">
              {{ item.children[0].props.title }}
            </span>
          </RouterLink>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Navbar',
  data() {
    return {}
  },
  created() {},
  computed: {
    ...mapState({
      global: (state) => state.global,
      Auth: (state) => state.admin.auth,
    }),
    authRouter() {
      if (this.Auth && this.Auth.user) {
        return this.Auth.getAuthRoutes().filter((r) => !r.default)
      }
      return []
    },
    navRouter() {
      return this.global.navbarTree.map((r) => {
        r.children = this.authRouter.filter((p) => p.groupName === r.name)
        return r
      })
    },
  },
  methods: {
    ...mapMutations(['setAsideShow']),
    isActive(route) {
      const reg = new RegExp(this.$route.name)
      return route.children.some((r) => reg.test(r.name))
    },
    toggleMenu(item) {
      if (!item.open && this.global.asideShow) {
        this.setAsideShow()
      }
      item.open = !item.open
    },
  },
}
</script>

<style lang="scss" scoped>
nav {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  li {
    a {
      --bg-opacity: 0;
    }
    &.active a {
      --bg-opacity: 0.2;
    }
    a:hover {
      --bg-opacity: 0.4;
    }
  }
}
.transition-panel {
  transition: max-height 0.4s;
}
</style>
