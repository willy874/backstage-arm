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
import { ListModel, ArticleImageModel } from '@/models'
import DeleteAllButton from '@/components/DeleteAllButton.vue'
import ListAddButton from '@/components/ListAddButton.vue'
import PaginationSelect from '@/components/PaginationSelect.vue'
import BackRouteButton from '@/components/BackRouteButton.vue'
import TableOptions from '@/components/TableOptions.vue'
import TableCheckbox from '@/components/TableCheckbox.vue'

export default {
  name: 'ActivityImageList',
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
        plugins: [DeleteAllButton, ListAddButton, BackRouteButton, PaginationSelect],
        ListModel: this.ListModel,
        selectList: this.selectList,
        backRoute: { name: this.routerName },
      }
    },
    datatable() {
      const tableCheckboxProps = {
        value: this.selectList,
        change: () => {},
      }
      const tableOptionsProps = {
        authDelete: this.Admin.auth.getAuth('delete'),
        detailRoute: this.routerName + 'ImageDetail',
        pageId: this.$route.params.id,
      }
      return {
        tables: [
          { title: '#', field: TableCheckbox, props: tableCheckboxProps, width: '40px', align: 'center' },
          { title: 'No.', field: (item, index) => index + 1, width: '80px', align: 'center' },
          {
            title: '圖片',
            field: (item) => `<img class="img-cover" src="${item.image_url}" width="60px" height="60px" />`,
            width: '76px',
            bodyStyle: { padding: '0 0.5rem' },
          },
          { title: '連結', field: (item) => (item.image_link ? '是' : '否'), width: '100px', align: 'center' },
          { title: '顯示/隱藏', field: (item) => (item.status ? '顯示' : '隱藏'), width: '100px', align: 'center' },
          { title: '更新時間', field: 'updated_at', width: 1, columnStyle: { minWidth: '160px' }, align: 'center' },
          { title: '更新管理員', field: 'updated_user', width: 1, columnStyle: { minWidth: '160px' }, align: 'center' },
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
      const id = this.$route.params.id
      const index = this.Activities.cache.map((p) => Number(p.id)).indexOf(Number(id))
      try {
        if (index >= 0) {
          this.ListModel = new ListModel({
            model: ArticleImageModel,
            data: this.Activities.cache[index].images,
          })
        } else {
          const res = await this.Activities.readListById(id)
          this.ListModel = new ListModel({
            model: ArticleImageModel,
            data: res.handle.images,
          })
        }
      } catch (error) {
        console.error(error)
      }
      this._sortList(this.ListModel.data)
    },
  },
}
</script>

<style></style>
