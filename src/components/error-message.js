import classNames from 'classnames'
import Validate from 'validate.js'

export default {
  name: 'ErrorMessage',
  data() {
    return {}
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
    field: {
      type: String,
      default: '',
    },
    tag: {
      type: String,
      default: 'div',
    },
    display: {
      type: String,
      default: 'block',
    },
    rules: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    isValid() {
      // 驗證到錯誤回傳 errorMessage，正常情況回傳 false
      const rules = Object.keys(this.rules).length ? this.rules : false
      if (rules) {
        const errorMessage = Validate(this.model, rules, { format: 'flat' })
        return errorMessage && errorMessage[0]
      } else if (this.model.errors && this.field && this.model.errors[this.field]) {
        return this.model.errors[this.field][0]
      }
      return false
    },
  },
  methods: {
    error(display) {
      this.$emit('error', this)
      return display
    },
  },
  render(h) {
    return h(
      this.tag,
      {
        ref: 'message',
        class: classNames('error-message'),
        style: {
          display: this.isValid ? this.error(this.display) : 'none',
        },
      },
      [this.$slots.default ? this.$slots.default : this.isValid]
    )
  },
}
