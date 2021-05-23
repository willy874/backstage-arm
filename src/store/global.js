import config from '@/config'

export default {
  state: {
    lang: '',
    routes: {},
    windowInnerWidth: window.innerWidth,
    windowInnerHeight: window.innerHeight,
    fontSize: 16,
    asideShow: false,
    navbarTree: [
      {
        name: 'Home',
        icon: 'Home',
        title: '首頁管理',
        open: false,
      },
      {
        name: 'News',
        icon: 'Chatting',
        title: '消息管理',
        open: false,
      },
      {
        name: 'Product',
        icon: 'Layers',
        title: '產品管理',
        open: false,
      },
      {
        name: 'Article',
        icon: 'Copywriting',
        title: '文章管理',
        open: false,
      },
      {
        name: 'System',
        icon: 'User',
        title: '系統設定',
        open: false,
      },
    ],
  },
  mutations: {
    setLang(state, value) {
      state.lang = value
    },
    setRoutes(state, value) {
      state.routes = value
    },
    setWindowInnerWidth(state) {
      state.windowInnerWidth = window.innerWidth
      state.windowInnerHeight = window.innerHeight
    },
    setAsideShow(state, value) {
      if (typeof value === 'boolean') {
        state.asideShow = value
      } else {
        state.asideShow = !state.asideShow
      }
      if (!(state.windowInnerWidth < config.deviceSwitch)) {
        state.navbarTree.forEach((p) => {
          p.open = false
        })
      }
    },
  },
  actions: {},
}
