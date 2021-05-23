<template>
  <div class="container-fluid flex-shrink-0 py-2">
    <div class="row justify-content-between">
      <div class="col-auto">
        <h2 class="my-1 font-weight-bold">{{ title }}</h2>
      </div>
      <div class="col-auto">
        <div class="d-flex justify-content-end mx-n1 flex-wrap">
          <div class="m-1" v-for="plugin in plugins" :key="plugin.name" v-bind="pluginProps" :is="plugin"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ListModel, DataModel } from '@/models'

export default {
  name: 'ArticelHeader',
  props: {
    title: {
      type: String,
      default: '',
    },
    backRoute: {
      type: [String, Object],
    },
    TargetModel: {
      type: DataModel,
      default: () => new DataModel(),
    },
    ListModel: {
      type: ListModel,
      default: () => new ListModel(),
    },
    selectList: {
      type: Array,
      default: () => [],
    },
    plugins: {
      type: Array,
      default: () => [],
    },
    routerName: {
      type: String,
      default: '',
    },
    authName: {
      type: String,
      default: '',
    },
  },
  created() {
    this.updatePage()
  },
  watch: {
    $route() {
      this.updatePage()
    },
  },
  computed: {
    pluginProps() {
      const result = this._assignPropsData
      delete result.title
      return result
    },
  },
  methods: {
    updatePage() {
      this.selectList.splice(0)
    },
  },
}
</script>

<style></style>
