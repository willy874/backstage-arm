<template>
  <PageLayout>
    <template slot="header">
      <ArticelDetailHeader class="border-bottom" v-bind="headerProps" />
    </template>
    <div class="container-fluid d-flex flex-column flex-fill">
      <div class="d-flex flex-column flex-fill bg-light rounded-lg">
        <form class="py-3" @submit="submit">
          <div class="d-flex">
            <div class="col-auto form-title py-2">標題</div>
            <div class="col py-2">
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': Model.hasError('subject') }"
                v-model="Model.subject"
              />
              <ErrorMessage class="text-danger small" :model="Model" field="subject" />
            </div>
          </div>
          <div class="d-flex">
            <div class="col-auto form-title py-2">副標題</div>
            <div class="col py-2">
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': Model.hasError('subtopic') }"
                v-model="Model.subtopic"
              />
              <ErrorMessage class="text-danger small" :model="Model" field="subtopic" />
            </div>
          </div>
          <div class="d-flex">
            <div class="col-auto form-title py-2">圖片</div>
            <div class="col py-2">
              <ImageUpload
                v-model="Model.banner_image"
                file-dimension="100X100"
                file-limit="5000000"
                width="120px"
                height="120px"
                file-limit-unit="mb"
              />
            </div>
          </div>
          <div class="py-1">
            <div class="col-auto form-title py-1">內文</div>
            <div
              class="col-12 ml-0 py-1 overflow-hidden d-flex flex-column position-relative"
              style="min-height: 300px"
            >
              <ckeditor :editor="editor" v-model="Model.content" :config="editorConfig"></ckeditor>
              <ErrorMessage class="text-danger small" :model="Model" field="content" />
            </div>
          </div>
          <div class="d-flex">
            <div class="col-auto form-title py-2">影片連結</div>
            <div class="col py-2">
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': Model.hasError('video_link') }"
                v-model="Model.video_link"
              />
            </div>
          </div>
          <div class="border-bottom m-3"></div>
          <div class="d-flex">
            <div class="col-auto form-title py-2">網頁標題</div>
            <div class="col py-2">
              <input type="text" class="form-control" v-model="Model.meta_title" />
            </div>
          </div>
          <div class="d-flex">
            <div class="col-auto form-title py-2">網頁描述</div>
            <div class="col py-2">
              <input type="text" class="form-control" v-model="Model.meta_description" />
            </div>
          </div>
          <div class="d-flex">
            <div class="col-auto form-title py-2">網頁關鍵字</div>
            <div class="col py-2">
              <input type="text" class="form-control" v-model="Model.meta_keywords" />
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
          <div class="container-fluid py-3">
            <transition-group name="models">
              <ParagraphItem
                class="py-2"
                v-for="(item, index) in Model.paragraphs"
                :key="item.id || item.uuid"
                :model="item"
                :index="index"
                @deleteOrder="deleteItemModel"
              >
              </ParagraphItem>
            </transition-group>
            <div class="py-3">
              <button type="button" class="w-100 btn btn-outline-primary" @click="addItemModel">
                <Icon pattern="Add" size="24" />
              </button>
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
import { v4 as uuid } from 'uuid'
import { ListModel, ActivityModel, ParagraphModel } from '@/models'
import DeleteButton from '@/components/DeleteButton.vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import editorConfig from '@/plugins/ckeditor/classic-config'
import ParagraphItem from './ParagraphItem.vue'

export default {
  name: 'ActivityDetail',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      selecteImageList: [],
      editor: ClassicEditor,
      editorConfig,
      ListModel: new ListModel(),
      Model: new ActivityModel(),
      submitError: false,
      backRouter: '/activity',
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
        plugins: [DeleteButton],
        TargetModel: this.Model,
        ListModel: this.Activities,
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
      if (!this.Activities) {
        return
      }
      try {
        const id = Number(this.$route.params.id)
        if (id) {
          const target = this.Activities.cache.find((p) => Number(p.id) === Number(id))
          if (target) {
            this.Model.set(target)
          } else {
            const res = await this.Activities.readListById(id)
            this.Model.set(res.handle)
          }
        }
      } catch (error) {
        console.error(error)
      }
    },
    addItemModel() {
      const ItemModel = new ParagraphModel()
      ItemModel.uuid = uuid()
      this.Model.paragraphs.push(ItemModel)
    },
    async deleteItemModel(index) {
      const item = this.Model.paragraphs[index]
      if (item.id) {
        await this.Model.paragraphs.deleteData()
        this.Model.paragraphs.splice(index, 1)
      } else {
        this.Model.paragraphs.splice(index, 1)
      }
    },
    async submit() {
      this.submitError = false
      const errorMessage = this.Model.validate({
        subject: {
          presence: {
            allowEmpty: false,
            message: '^請填寫標題',
          },
        },
        subtopic: {
          presence: {
            allowEmpty: false,
            message: '^請填寫副標題',
          },
        },
        content: {
          presence: {
            allowEmpty: false,
            message: '^請填寫內容',
          },
        },
      })
      const itemErrorMessage = this.Model.paragraphs.map((model) => {
        return model.validate({
          subject: {
            presence: {
              allowEmpty: false,
              message: '^請填寫標題',
            },
          },
          paragraph_subject: {
            presence: {
              allowEmpty: false,
              message: '^請填寫內文大標',
            },
          },
          paragraph_subtopic: {
            presence: {
              allowEmpty: false,
              message: '^請填寫內文小標',
            },
          },
          content: {
            presence: {
              allowEmpty: false,
              message: '^請填寫內容',
            },
          },
        })
      })
      if (this._isModelError(errorMessage, ...itemErrorMessage).length) {
        this.submitError = true
        return
      }
      try {
        await this._saveModel(this.Model, this.ListModel, Number(this.$route.params.id))
      } catch (error) {
        console.error(error)
      }
      this.$router.push(this.backRouter)
    },
    changeStatus() {
      this.Model.status = this.Model.status ? 0 : 1
    },
  },
  components: {
    ParagraphItem,
  },
}
</script>

<style lang="scss" scoped>
.form-title {
  width: 120px;
}
</style>
