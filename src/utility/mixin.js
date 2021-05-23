import _uniq from 'lodash/uniq'
import _flattenDeep from 'lodash/flattenDeep'
import dayjs from 'dayjs'
import ListModel from '../models/proto/list'
import DataModel from '../models/proto/data'

export default {
  computed: {
    _assignPropsData() {
      return {
        ...this.$attrs,
        ...this.$props,
        ...this.$data,
      }
    },
  },
  /**
   * 避免在 mixin.methods 使用 this，減少函數間的耦合性
   */
  methods: {
    _newListModel(args, model = new DataModel()) {
      return new ListModel({
        model,
        ...args,
      })
    },
    async _readList(list) {
      const listQuery = list.query
      return await list.readList({
        config: {
          params: listQuery || this.$route.query,
        },
      })
    },
    /**
     * 會先以 sort 來排序，其次再依據 key 的字串來排序
     * @param {Array.<ArticleModel>} list 要被排列的陣列
     * @param {String} key 要被排序的 key
     * @param {Boolean} desc 是否倒序排列
     */
    _sortList(list = [], key = 'created_at', desc = true) {
      list.sort((p, n) => {
        const sort = p.sort - n.sort
        if (!sort) {
          if (!p[key] || !n[key]) {
            return 0
          }
          const prev = p[key].toUpperCase()
          const next = n[key].toUpperCase()
          if (prev < next) return desc ? 1 : -1
          if (prev > next) return desc ? -1 : 1
        }
        return sort
      })
    },
    /**
     * @param  {...any} errors
     * @returns {Promise<Array<String>>}
     */
    _isModelError(...errors) {
      return _uniq(
        _flattenDeep(
          errors.map((error) => {
            return Object.values(error).filter((p) => p)
          })
        )
      )
    },
    /**
     *
     * @param {DataModel} model 要儲存的 Model
     * @param {ListModel} list 要處理的 ListModel
     * @param {Number} id 如果是要以新增的方式儲存則傳入此參數
     */
    async _saveModel(model, list, id = 0) {
      const ModelType = list.modelType
      if (id) {
        const thisModel = list.data.find((p) => Number(p) === Number(id))
        console.log(thisModel)
        thisModel.updated_at = dayjs().format(thisModel.dayFormat)
        await thisModel.updateData()
        const TargetModel = list.data.find((p) => p.id === model.id)
        TargetModel.set(model)
      } else {
        model.created_at = dayjs().format(model.dayFormat)
        const res = await model.createData()
        list.data.unshift(new ModelType(res.data))
      }
    },
    // TODO saveModelImage
    _saveModelImage() {},
  },
  beforeRouteEnter(to, from, next) {
    to.meta.enter = 'slide-left'
    from.meta.leave = 'fade'
    window.requestAnimationFrame(next)
  },
  beforeRouteUpdate(to, from, next) {
    to.meta.enter = 'slide-left'
    from.meta.leave = 'fade'
    window.requestAnimationFrame(next)
  },
}
