export default {
  baseUrl: process.env.VUE_APP_BASE_URL,
  devServer: process.env.VUE_APP_DEV_SERVER,
  mode: process.env.NODE_ENV,
  version: '0.0.1',
  api: {
    baseUrl: `${process.env.VUE_APP_BASE_URL}/api/`,
    version: process.env.VUE_APP_VERSION,
  },
  layout: {
    asideWidth: 240,
    deviceSwitch: 768,
  },
}
