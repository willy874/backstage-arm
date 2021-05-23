<template>
  <div v-if="ListModel.last_page > 1">
    <select class="form-control" v-model="selectPage" @change="changePage">
      <option disabled :value="1">請選擇</option>
      <option v-for="i in ListModel.last_page" :key="i" :value="i">第{{ i }}頁</option>
    </select>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ListModel } from '@/models'

export default {
  name: 'PaginationSelect',
  props: {
    ListModel: {
      type: ListModel,
      default: () => new ListModel(),
    },
  },
  data() {
    return {
      selectPage: 1,
    }
  },
  computed: {
    ...mapState({
      Admin: (state) => state.admin,
    }),
  },
  methods: {
    changePage() {
      this.$router.push({ name: this.$route.name, query: { page: this.selectPage } })
    },
  },
}
</script>

<style></style>
