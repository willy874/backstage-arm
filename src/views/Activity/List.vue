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
import TableImageOptions from '@/components/TableImageOptions.vue'
import TableReservationOptions from '@/components/TableReservationOptions.vue'

export default {
  name: 'ActivityList',
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
      Activities: (state) => state.model.db.ActivityModel,
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
      const tableImageOptionsProps = {
        authDelete: this.Admin.auth.getAuth('delete'),
        detailRoute: this.routerName + 'ImageList',
      }
      const tableReservationOptionsProps = {
        detailRoute: this.routerName + 'ReservationList',
      }
      return {
        tables: [
          { title: '#', field: TableCheckbox, props: tableCheckboxProps, width: '40px', align: 'center' },
          { title: 'No.', field: (item, index) => index + 1, width: '80px', align: 'center' },
          {
            title: '名稱',
            field: 'subject',
            width: 1,
            columnStyle: { minWidth: '160px' },
            bodyStyle: { padding: '0 0.5rem' },
          },
          {
            title: '副標題',
            field: 'subtopic',
            width: 1,
            columnStyle: { minWidth: '160px' },
            bodyStyle: { padding: '0 0.5rem' },
          },
          { title: '顯示/隱藏', field: (item) => (item.status ? '顯示' : '隱藏'), width: '100px', align: 'center' },
          { title: '多筆圖', field: TableImageOptions, props: tableImageOptionsProps, width: '100px', align: 'center' },
          {
            title: '預約人數',
            field: TableReservationOptions,
            props: tableReservationOptionsProps,
            width: '100px',
            align: 'center',
          },
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
      if (!this.Activities) {
        return
      }
      try {
        await this._readList(this.Activities)
      } catch (error) {
        console.error(error)
      }
      this.ListModel = this.Activities
      this._sortList(this.ListModel.data)
    },
  },
}
</script>

<style></style>
