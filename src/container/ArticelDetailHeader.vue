<template>
  <div class="container-fluid flex-shrink-0 py-2">
    <div class="row flex-between" v-if="idAddStatus">
      <div class="col-auto">
        <h2 class="mb-0 font-weight-bold">{{ title }} - 新增</h2>
      </div>
      <div class="col">
        <div class="d-flex justify-content-end">
          <RouterLink :to="backRoute" class="btn btn-secondary text-white">取消</RouterLink>
        </div>
      </div>
    </div>
    <div class="row flex-between" v-else>
      <div class="col-auto">
        <h2 class="mb-0 font-weight-bold">{{ title }} - 詳情</h2>
      </div>
      <div class="col">
        <div class="d-flex justify-content-end mx-n2">
          <div class="m-1" v-for="plugin in plugins" :key="plugin.name" v-bind="pluginProps" :is="plugin"></div>
          <RouterLink :to="backRoute" class="btn btn-primary text-white d-flex align-items-center m-1">
            <Icon class="transform rotate-180 mr-2" pattern="Arrow" size="12" />
            <span>回列表</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ListModel, DataModel } from '@/models'

export default {
  name: 'ArticelDetailHeader',
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
  computed: {
    idAddStatus() {
      return this.$route.params.id === '0' || this.$route.params.img === '0'
    },
    pluginProps() {
      const result = this._assignPropsData
      delete result.title
      return result
    },
  },
  methods: {
    orderDelete(e) {
      this.$emit('orderDelete', e)
    },
  },
}
</script>

<style></style>
