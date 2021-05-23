<template>
  <div v-if="Admin.auth.getAuth('create')">
    <RouterLink :to="addRouteTo" class="btn btn-info text-white mx-2"> 新增 </RouterLink>
    <!-- <button type="button" class="btn btn-info text-white" disabled>新增</button> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ListModel } from '@/models'

export default {
  name: 'ListAddButton',
  props: {
    ListModel: {
      type: ListModel,
      default: () => new ListModel(),
    },
    selectList: {
      type: Array,
      default: () => [],
    },
    routerName: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState({
      Admin: (state) => state.admin,
    }),
    addRouteTo() {
      const id = this.$route.params.id
      if (/ImageList/.test(this.$route.name)) {
        return { name: this.routerName + 'ImageDetail', params: { id, img: '0' } }
      }
      return { name: this.routerName + 'Detail', params: { id: '0' } }
    },
  },
}
</script>

<style></style>
