<template>
  <div>
    <div id="layout" v-if="Admin.login">
      <Header class="py-2 border-bottom d-flex align-items-center">
        <div class="pl-3" v-if="storeGlobal.windowInnerWidth < deviceSwitch">
          <Navbtn @btnClick="btnClick" />
        </div>
        <router-link to="/" class="d-flex align-items-center px-3">
          <img alt="logo" :src="LogoIcon" height="40" />
          <img class="mx-3" alt="POSEIDON" :src="LogoText" height="24" />
        </router-link>
      </Header>
      <main>
        <Aside>
          <template slot="header">
            <div class="p-2 text-white" v-if="!(storeGlobal.windowInnerWidth < deviceSwitch)">
              <Navbtn @btnClick="btnClick" />
            </div>
          </template>
          <template>
            <Navbar />
          </template>
        </Aside>
        <div class="scroll-panel flex-grow-1 overflow-hidden">
          <transition name="router">
            <router-view />
          </transition>
        </div>
      </main>
    </div>
    <div v-else>
      <transition name="router">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from './Header.vue'
import Aside from './Aside.vue'
import Navbtn from '@/components/Navbtn.vue'
import Navbar from './Navbar.vue'
import config from '@/config'
import { LogoIcon, LogoText } from '@/assets'

export default {
  data() {
    return {
      LogoIcon,
      LogoText,
      deviceSwitch: config.layout.deviceSwitch,
    }
  },
  computed: {
    ...mapState({
      global: (state) => state.global,
      Admin: (state) => state.admin,
    }),
    ...mapState({
      storeGlobal: (state) => state.global,
    }),
  },
  methods: {
    btnClick() {},
  },
  components: {
    Header,
    Aside,
    Navbtn,
    Navbar,
  },
}
</script>

<style lang="scss" src="./layout.scss"></style>
