<template>
  <PageLayout>
    <template slot="header">
      <ArticelHeader class="border-bottom" v-bind="headerProps" />
    </template>
    <div class="container-fluid d-flex flex-column flex-fill">
      <DataTable v-bind="datatable" class="d-flex flex-column flex-fill"></DataTable>
    </div>
  </PageLayout>
</template>

<script>
import { mapState } from 'vuex'
import { ListModel } from '@/models'
import DeleteAllButton from '@/components/DeleteAllButton.vue'
import ListAddButton from '@/components/ListAddButton.vue'
import PaginationSelect from '@/components/PaginationSelect.vue'
import TableOptions from '@/components/TableOptions.vue'
import TableCheckbox from '@/components/TableCheckbox.vue'

export default {
  name: 'MessageList',
  props: {
    title: {
      type: String,
      default: '',
    },
    routerName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      ListModel: new ListModel(),
      selectList: [],
    }
  },
  computed: {
    ...mapState({
      Messages: (state) => state.model.db.MessageModel,
      Admin: (state) => state.admin,
    }),
    headerProps() {
      return {
        ...this.$props,
        plugins: [DeleteAllButton, ListAddButton, PaginationSelect],
        ListModel: this.ListModel,
        selectList: this.selectList,
      }
    },
    datatable() {
      const tableCheckboxProps = {
        value: this.selectList,
        change: () => {},
      }
      const tableOptionsProps = {
        authDelete: this.Admin.auth.getAuth('delete'),
        detailRoute: this.routerName + 'Detail',
      }
      return {
        tables: [
          { title: '#', field: TableCheckbox, props: tableCheckboxProps, width: '40px', align: 'center' },
          { title: 'No.', field: (item, index) => index + 1, width: '80px', align: 'center' },
          {
            title: '標題',
            field: 'subject',
            width: 2,
            columnStyle: { minWidth: '250px' },
            bodyStyle: { padding: '0 0.5rem' },
          },
          { title: '顯示/隱藏', field: (item) => (item.status ? '顯示' : '隱藏'), width: '100px', align: 'center' },
          { title: '上傳時間', field: 'created_at', width: 1, columnStyle: { minWidth: '160px' }, align: 'center' },
          { title: '管理', field: TableOptions, props: tableOptionsProps, width: '100px', align: 'center' },
        ],
        listData: this.ListModel,
      }
    },
  },
  async created() {
    await this.$root.login
    this.updatePage()
  },
  watch: {
    $route() {
      this.updatePage()
    },
  },
  methods: {
    async updatePage() {
      if (!this.Messages) {
        return
      }
      try {
        await this._readList(this.Messages)
      } catch (error) {
        console.error(error)
      }
      this.ListModel = this.Messages
      this._sortList(this.ListModel.data)
    },
  },
}
</script>

<style></style>
