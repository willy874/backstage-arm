<template>
  <div v-if="Admin.auth.getAuth('delete')">
    <button type="button" class="btn btn-danger" @click="orderDelete">刪除</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ListModel, DataModel } from '@/models'

export default {
  name: 'DeleteAllButton',
  props: {
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
    backRoute: {
      type: [String, Object],
    },
  },
  computed: {
    ...mapState({
      Admin: (state) => state.admin,
    }),
  },
  methods: {
    async orderDelete() {
      const swalResult = await this.$alert.delete()
      if (swalResult.isConfirmed) {
        await this.TargetModel.deleteData()
        await this._readList(this.ListModel)
        this.$router.push(this.backRoute)
      }
    },
  },
}
</script>

<style></style>
