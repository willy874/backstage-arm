<template>
  <div>
    <div class="border">
      <div class="border-bottom d-flex flex-between m-1">
        <h5 class="px-2 m-0">段落 {{ index + 1 }}</h5>
        <div>
          <button type="button" class="btn-icon text-danger m-1" @click="deleteOrder">
            <Icon pattern="Trash" size="24" />
          </button>
        </div>
      </div>
      <div>
        <div class="d-flex">
          <div class="col-auto form-title py-2">段落標題</div>
          <div class="col py-2">
            <input
              type="text"
              class="form-control"
              :class="{ 'is-invalid': model.hasError('subject') }"
              v-model="model.subject"
            />
            <ErrorMessage class="text-danger small" :model="model" field="subject" />
          </div>
        </div>
        <div class="d-flex">
          <div class="col-auto form-title py-2">內文大標</div>
          <div class="col py-2">
            <input
              type="text"
              class="form-control"
              :class="{ 'is-invalid': model.hasError('paragraph_subject') }"
              v-model="model.paragraph_subject"
            />
            <ErrorMessage class="text-danger small" :model="model" field="paragraph_subject" />
          </div>
        </div>
        <div class="d-flex">
          <div class="col-auto form-title py-2">內文小標</div>
          <div class="col py-2">
            <input
              type="text"
              class="form-control"
              :class="{ 'is-invalid': model.hasError('paragraph_subtopic') }"
              v-model="model.paragraph_subtopic"
            />
            <ErrorMessage class="text-danger small" :model="model" field="paragraph_subtopic" />
          </div>
        </div>
        <div class="py-1">
          <div class="col-auto form-title py-1">內文</div>
          <div class="col-12 ml-0 py-1 overflow-hidden d-flex flex-column position-relative" style="min-height: 300px">
            <ckeditor :editor="editor" v-model="model.content" :config="editorConfig"></ckeditor>
            <ErrorMessage class="text-danger small" :model="model" field="content" />
          </div>
        </div>
        <div class="d-flex">
          <div class="col-auto form-title py-2">圖片</div>
          <div class="col py-2">
            <ImageUpload
              v-model="model.image"
              file-dimension="100X100"
              file-limit="5000000"
              width="120px"
              height="120px"
              file-limit-unit="mb"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ParagraphModel } from '@/models'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import editorConfig from '@/plugins/ckeditor/classic-config'

export default {
  name: 'ActivityDetail',
  props: {
    model: {
      type: ParagraphModel,
    },
    index: {
      type: Number,
    },
  },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig,
    }
  },
  methods: {
    deleteOrder() {
      this.$emit('deleteOrder', this.index)
    },
  },
}
</script>

<style lang="scss" scoped>
.form-title {
  width: 120px;
}
.models-enter-active,
.models-leave-active {
  transform-origin: top;
  transition: transform 400ms ease;
}
.models-enter,
.models-leave-to {
  transform: scaleY(0);
}
.models-enter-to,
.models-leave {
  transform: scaleY(1);
}
</style>
