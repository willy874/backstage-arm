<template>
  <div class="d-flex flex-center w-100">
    <div class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" :id="uuid" @change="changeEvent" />
      <label class="custom-control-label" :for="uuid"></label>
    </div>
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid'

export default {
  name: 'TableCheckbox',
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    listIndex: {
      type: Number,
      required: true,
    },
    listData: {
      type: Object,
      required: true,
    },
    change: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      uuid: uuid(),
    }
  },
  methods: {
    changeEvent(e) {
      const model = this.listData.data[this.listIndex]
      if (this.value.includes(model)) {
        const index = this.value.indexOf(model)
        this.value.splice(index, 1)
      } else {
        this.value.push(model)
      }
      this.change(e, model)
    },
  },
}
</script>

<style></style>
