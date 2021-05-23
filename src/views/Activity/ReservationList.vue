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
import { ListModel, ReservationModel } from '@/models'
import BackRouteButton from '@/components/BackRouteButton.vue'

export default {
  name: 'ActivityReservationList',
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
      ReservationList: new ListModel(),
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
        plugins: [BackRouteButton],
        ListModel: this.ListModel,
        backRoute: { name: this.routerName },
      }
    },
    datatable() {
      return {
        tables: [
          { title: 'No.', field: (item, index) => index + 1, width: '80px', align: 'center' },
          { title: '姓名', field: 'name', width: '80px', bodyStyle: { padding: '0 0.5rem' } },
          { title: '電話', field: 'phone', width: '150px', bodyStyle: { padding: '0 0.5rem' } },
          {
            title: '電子郵件',
            field: 'email',
            width: 1,
            columnStyle: { minWidth: '160px' },
            bodyStyle: { padding: '0 0.5rem' },
          },
          {
            title: '地址',
            field: 'address',
            width: 2,
            columnStyle: { minWidth: '300px' },
            bodyStyle: { padding: '0 0.5rem' },
          },
          { title: '預約時間', field: 'reservation_datetime', width: '175px', bodyStyle: { padding: '0 0.5rem' } },
        ],
        listData: this.ReservationList,
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
      await this.Activities.readList()
      this.ListModel = this.Activities
      const id = this.$route.params.id
      const index = this.ListModel.data.map((p) => p.id).indexOf(Number(id))
      this.ReservationList = new ListModel({
        model: ReservationModel,
        data: this.ListModel.data[index].reservations,
      })
      this._sortList(this.ReservationList.data)
    },
  },
}
</script>

<style></style>
