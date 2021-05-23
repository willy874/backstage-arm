<template>
  <div v-if="Admin.auth.getAuth('delete')">
    <button type="button" class="btn btn-danger" v-if="selectList.length" @click="deleteAll">刪除已選擇</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ListModel } from '@/models'
import { Observable } from '@/utility'

export default {
  name: 'DeleteAllButton',
  props: {
    ListModel: {
      type: ListModel,
      default: () => new ListModel(),
    },
    selectList: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapState({
      Admin: (state) => state.admin,
    }),
  },
  methods: {
    async deleteAll() {
      const swalResult = await this.$alert.delete()
      if (swalResult.isConfirmed) {
        const observable = new Observable((subscriber) => {
          this.selectList.forEach((model) => {
            subscriber.next(() => {
              return model.deleteData()
            })
          })
          subscriber.error((err) => {
            console.log(err)
          })
          subscriber.complete(() => {
            this._readList(this.ListModel)
            this.selectList.splice(0)
          })
        })
        observable.run()
      }
    },
  },
}
</script>

<style></style>
