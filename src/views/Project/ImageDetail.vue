<template>
  <PageLayout>
    <template slot="header">
      <ArticelDetailHeader class="border-bottom" v-bind="headerProps" />
    </template>
    <div class="container-fluid d-flex flex-column flex-fill">
      <div class="d-flex flex-column flex-fill bg-light rounded-lg">
        <form class="py-3" @submit="submit">
          <div class="d-flex">
            <div class="col-auto form-title py-2">圖片</div>
            <div class="col py-2">
              <ImageUpload
                v-model="Model"
                file-dimension="500X500"
                file-limit="5000000"
                width="120px"
                height="120px"
                file-limit-unit="mb"
              />
              <ErrorMessage class="text-danger small" :model="Model" field="image_url" />
            </div>
          </div>
          <div class="border-bottom m-3"></div>
          <div class="d-flex">
            <div class="col-auto form-title py-2">圖片標題</div>
            <div class="col py-2">
              <input type="text" class="form-control" v-model="Model.image_title" />
            </div>
          </div>
          <div class="d-flex">
            <div class="col-auto form-title py-2">圖片描述</div>
            <div class="col py-2">
              <input type="text" class="form-control" v-model="Model.image_alt" />
            </div>
          </div>
          <div class="d-flex">
            <div class="col-auto form-title py-2">圖片連結</div>
            <div class="col py-2">
              <input type="text" class="form-control" v-model="Model.image_link" />
            </div>
          </div>
          <div class="border-bottom m-3"></div>
          <div class="d-flex">
            <div class="col-auto form-title py-2">排序</div>
            <div class="col py-2">
              <input type="text" class="form-control" v-model="Model.sort" />
            </div>
          </div>
          <div class="d-flex">
            <div class="col-auto form-title py-2 mt-0">顯示/隱藏</div>
            <div class="col py-2 d-flex align-items-center">
              <div class="custom-control custom-switch">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="checkboxStatus"
                  :checked="Model.status"
                  @change="changeStatus"
                />
                <label class="custom-control-label" for="checkboxStatus">
                  <span v-if="Model.status">顯示</span>
                  <span v-else>隱藏</span>
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <template slot="footer">
      <div class="container-fluid py-2 border-top">
        <div class="d-flex align-items-center">
          <div class="px-3">
            <button type="button" class="btn btn-success" @click="submit">確認</button>
          </div>
          <div v-if="submitError" class="text-danger">表單填寫不完整或填寫錯誤</div>
        </div>
      </div>
    </template>
  </PageLayout>
</template>
<script>
import { mapState } from 'vuex'
import { ListModel, ArticleImageModel } from '@/models'
import DeleteButton from '@/components/DeleteButton.vue'

export default {
  name: 'ProjectImageDetail',
  props: {
    title: {
      type: String,
      default: '',
    },
    authName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      ProjectModel: new ListModel(),
      ListModel: new ListModel(),
      Model: new ArticleImageModel(),
      submitError: false,
      backRouter: `/project/${this.$route.params.id}/image`,
    }
  },
  computed: {
    ...mapState({
      Projects: (state) => state.model.db.ProjectModel,
      Admin: (state) => state.admin,
    }),
    headerProps() {
      return {
        ...this.$props,
        plugins: [DeleteButton],
        TargetModel: this.Model,
        ListModel: this.ListModel,
        backRoute: this.backRouter,
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
      if (!this.Projects) {
        return
      }
      const id = Number(this.$route.params.id)
      const imgId = Number(this.$route.params.img)
      const target = this.Projects.cache.find((p) => Number(p.id) === Number(id))
      if (Number(id)) {
        try {
          if (target) {
            this.ListModel = new ListModel({
              model: ArticleImageModel,
              data: target.images,
            })
          } else {
            const res = await this.Projects.readListById(id)
            this.ListModel = new ListModel({
              model: ArticleImageModel,
              data: res.handle.images,
            })
          }
          if (imgId) {
            const data = this.ListModel.data.find((p) => Number(p.id) === Number(imgId))
            this.Model.set(data)
          }
        } catch (error) {
          console.error(error)
        }
      }
    },
    async submit() {
      this.submitError = false
      const errorMessage = this.Model.validate({
        image_url: {
          presence: {
            allowEmpty: false,
            message: '^請上傳圖片',
          },
        },
      })
      if (Object.keys(errorMessage).length) {
        return
      }
      try {
        const id = Number(this.$route.params.id)
        const imgId = Number(this.$route.params.img)
        const list = this.ListModel
        const model = id ? list.data.find((p) => Number(p) === Number(id)) : this.Model
        this._saveModelImage(model, list, id, imgId)
      } catch (error) {
        console.error(error)
      }
      this.$router.push(this.backRouter)
    },
    changeStatus() {
      this.Model.status = this.Model.status ? 0 : 1
    },
  },
}
</script>

<style lang="scss" scoped>
.form-title {
  width: 120px;
  margin-top: 7px;
}
</style>
